import { APP_BASE_HREF, isPlatformServer } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Injectable, LOCALE_ID, PLATFORM_ID, inject } from "@angular/core";
import { Marked, Renderer, type Tokens } from "marked";
import { lastValueFrom } from "rxjs";
import {
  DEFAULT_LEECH_DOC_SLUG,
  LEECH_DOCS,
  type LeechDocMeta,
  getLeechDocMeta,
  isLeechDocSlug,
} from "../model";

export interface LeechDocHeading {
  readonly id: string;
  readonly title: string;
}

export interface LeechDoc extends LeechDocMeta {
  readonly content: string;
  readonly headings: readonly LeechDocHeading[];
  readonly readingTimeMinutes: number;
}

type NodeFsPromises = {
  readonly readFile: (path: string, encoding: "utf8") => Promise<string>;
};

@Injectable({ providedIn: "root" })
export class LeechDocsService {
  private readonly http = inject(HttpClient);
  private readonly locale = inject(LOCALE_ID);
  private readonly baseHref = inject(APP_BASE_HREF, { optional: true }) ?? "/";
  private readonly platformId = inject(PLATFORM_ID);
  private readonly parser = new Marked();

  public readonly docs = LEECH_DOCS;

  private async fetchDoc(slug: string): Promise<LeechDoc | null> {
    const meta = getLeechDocMeta(slug);
    if (!meta) {
      return null;
    }

    try {
      const response = await this.loadMarkdown(meta.slug);

      const { metadata, content } = this.parseFrontmatter(response);
      const body = this.stripLeadingHeading(content);
      const headings = this.extractHeadings(body);
      const htmlContent = this.renderMarkdown(body);

      return {
        ...meta,
        title: metadata["title"] || meta.title,
        description: metadata["description"] || meta.description,
        content: htmlContent,
        headings,
        readingTimeMinutes: this.getReadingTimeMinutes(body),
      };
    } catch {
      return null;
    }
  }

  private async loadMarkdown(slug: string): Promise<string> {
    try {
      return await lastValueFrom(
        this.http.get(this.getContentPath(slug), { responseType: "text" }),
      );
    } catch (error) {
      if (!isPlatformServer(this.platformId)) {
        throw error;
      }

      return this.readServerMarkdown(slug);
    }
  }

  private async readServerMarkdown(slug: string): Promise<string> {
    const { readFile } = await this.importNodeFsPromises();

    return readFile(
      `${process.cwd()}/${this.getContentSourcePath(slug)}`,
      "utf8",
    );
  }

  private importNodeFsPromises(): Promise<NodeFsPromises> {
    const importer = new Function("specifier", "return import(specifier)") as (
      specifier: string,
    ) => Promise<NodeFsPromises>;

    return importer("node:fs/promises");
  }

  private parseFrontmatter(content: string): {
    metadata: Record<string, string>;
    content: string;
  } {
    const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
    const match = content.match(frontmatterRegex);

    if (!match) {
      return { metadata: {}, content };
    }

    const metadata: Record<string, string> = {};
    const frontmatter = match[1];
    const body = match[2];

    frontmatter.split(/\r?\n/).forEach((line) => {
      const normalized = line.trim();
      if (!normalized || normalized.startsWith("-") || line.startsWith(" ")) {
        return;
      }

      const [key, ...valueParts] = normalized.split(":");
      if (key && valueParts.length) {
        const value = valueParts
          .join(":")
          .trim()
          .replace(/^["']|["']$/g, "");
        metadata[key.trim()] = value;
      }
    });

    return { metadata, content: body };
  }

  private getContentPath(slug: string): string {
    const baseHref = this.baseHref.endsWith("/")
      ? this.baseHref
      : `${this.baseHref}/`;
    const prefix = this.locale.startsWith("en") ? "content/en" : "content";

    return `${baseHref}${prefix}/leech/${slug}.md`;
  }

  private getContentSourcePath(slug: string): string {
    const prefix = this.locale.startsWith("en") ? "content/en" : "content";

    return `${prefix}/leech/${slug}.md`;
  }

  private stripLeadingHeading(content: string): string {
    return content
      .trimStart()
      .replace(/^#\s+.+(?:\r?\n){1,2}/, "")
      .trim();
  }

  private extractHeadings(content: string): readonly LeechDocHeading[] {
    const slugs = new Map<string, number>();

    return this.parser
      .lexer(content)
      .filter((token): token is Tokens.Heading => token.type === "heading")
      .filter((heading) => heading.depth === 2)
      .map((heading) => {
        const id = this.getUniqueSlug(heading.text, slugs);

        return {
          id,
          title: heading.text,
        };
      });
  }

  private renderMarkdown(content: string): string {
    const slugs = new Map<string, number>();
    const renderer = new Renderer();

    renderer.heading = ({ tokens, depth, text }) => {
      const title = renderer.parser.parseInline(tokens);
      const id = this.getUniqueSlug(text, slugs);

      return `<h${depth} id="${id}">${title}</h${depth}>`;
    };

    renderer.html = () => "";

    renderer.link = ({ href, title, tokens }) => {
      if (!this.isSafeHref(href)) {
        return renderer.parser.parseInline(tokens);
      }

      const label = renderer.parser.parseInline(tokens);
      const safeHref = this.escapeAttribute(href);
      const safeTitle = title ? ` title="${this.escapeAttribute(title)}"` : "";
      const external = /^https?:\/\//.test(href)
        ? ' target="_blank" rel="noopener noreferrer"'
        : "";

      return `<a href="${safeHref}"${safeTitle}${external}>${label}</a>`;
    };

    renderer.image = ({ href, title, text }) => {
      if (!this.isSafeHref(href)) {
        return "";
      }

      const safeHref = this.escapeAttribute(href);
      const safeAlt = this.escapeAttribute(text);
      const safeTitle = title ? ` title="${this.escapeAttribute(title)}"` : "";

      return `<img src="${safeHref}" alt="${safeAlt}"${safeTitle} loading="lazy" />`;
    };

    return this.parser.parse(content, {
      async: false,
      gfm: true,
      renderer,
    }) as string;
  }

  private getUniqueSlug(title: string, slugs: Map<string, number>): string {
    const base = this.slugify(title);
    const count = slugs.get(base) ?? 0;
    slugs.set(base, count + 1);

    return count ? `${base}-${count + 1}` : base;
  }

  private slugify(value: string): string {
    return (
      value
        .toLocaleLowerCase(this.locale)
        .replace(/[^\p{L}\p{N}]+/gu, "-")
        .replace(/^-+|-+$/g, "") || "section"
    );
  }

  private getReadingTimeMinutes(content: string): number {
    const words = content
      .replace(/[^\p{L}\p{N}]+/gu, " ")
      .trim()
      .split(/\s+/)
      .filter(Boolean).length;

    return Math.max(1, Math.ceil(words / 180));
  }

  private isSafeHref(href: string): boolean {
    return /^(https?:\/\/|mailto:|tel:|#|\/(?!\/))/.test(href);
  }

  private escapeAttribute(value: string): string {
    return value
      .replaceAll("&", "&amp;")
      .replaceAll('"', "&quot;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
  }

  public async getDoc(
    slug: string = DEFAULT_LEECH_DOC_SLUG,
  ): Promise<LeechDoc | null> {
    return isLeechDocSlug(slug) ? this.fetchDoc(slug) : null;
  }

  public async getAllDocs(): Promise<LeechDoc[]> {
    return Promise.all(this.docs.map((doc) => this.fetchDoc(doc.slug))).then(
      (docs) => docs.filter((doc): doc is LeechDoc => doc !== null),
    );
  }
}
