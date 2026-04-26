import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { marked } from "marked";
import { lastValueFrom } from "rxjs";

export interface LeechDocNavigationItem {
  title: string;
  slug: string;
  current?: boolean;
}

export interface LeechDoc {
  title: string;
  slug: string;
  description?: string;
  content: string;
  navigation?: LeechDocNavigationItem[];
}

@Injectable({ providedIn: "root" })
export class LeechDocsService {
  private readonly http = inject(HttpClient);

  private async fetchDoc(slug: string): Promise<LeechDoc | null> {
    try {
      const response = await lastValueFrom(
        this.http.get(`/content/leech/${slug}.md`, { responseType: "text" }),
      );

      const { metadata, content } = this.parseFrontmatter(response as string);

      const navString = metadata["navigation"];
      let navigation: LeechDocNavigationItem[] | undefined;
      if (navString) {
        try {
          navigation = JSON.parse(navString);
        } catch {
          navigation = undefined;
        }
      }

      const htmlContent = await marked.parse(content);

      return {
        title: metadata["title"] || "",
        slug,
        description: metadata["description"],
        content: htmlContent,
        navigation,
      };
    } catch {
      return null;
    }
  }

  private parseFrontmatter(content: string): {
    metadata: Record<string, string>;
    content: string;
  } {
    const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
    const match = content.match(frontmatterRegex);

    if (!match) {
      return { metadata: {}, content };
    }

    const metadata: Record<string, string> = {};
    const frontmatter = match[1];
    const body = match[2];

    frontmatter.split("\n").forEach((line) => {
      const [key, ...valueParts] = line.split(":");
      if (key && valueParts.length) {
        const value = valueParts
          .join(":")
          .trim()
          .replace(/^["']|["']$/g, "");
        metadata[key.trim()] = value;
      }
    });

    if (metadata["navigation"]) {
      try {
        metadata["navigation"] = metadata["navigation"].replace(/^"|"$/g, "");
      } catch {
        // ignore
      }
    }

    return { metadata, content: body };
  }

  public async getDoc(slug: string): Promise<LeechDoc | null> {
    return this.fetchDoc(slug);
  }

  public async getAllDocs(): Promise<LeechDoc[]> {
    return Promise.all([
      this.fetchDoc("index"),
      this.fetchDoc("wild"),
      this.fetchDoc("biochemistry"),
      this.fetchDoc("references"),
      this.fetchDoc("collection"),
    ]).then((docs) => docs.filter((doc): doc is LeechDoc => doc !== null));
  }
}
