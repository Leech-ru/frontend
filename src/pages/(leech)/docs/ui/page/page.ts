import { DOCUMENT } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { TuiButton, TuiIcon, TuiLink } from "@taiga-ui/core";
import { TuiFade, TuiTabs } from "@taiga-ui/kit";
import {
  DEFAULT_LEECH_DOC_SLUG,
  MarkdownComponent,
  type LeechDoc,
  type LeechDocMeta,
  LeechDocsService,
} from "@/entities/leech-docs";

@Component({
  templateUrl: "page.html",
  styleUrl: "page.less",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MarkdownComponent,
    RouterLink,
    RouterLinkActive,
    TuiButton,
    TuiFade,
    TuiIcon,
    TuiLink,
    TuiTabs,
  ],
})
export class AppLeechDocsPageComponent {
  private readonly docsService = inject(LeechDocsService);
  private readonly document = inject(DOCUMENT);

  public readonly slug = input<string>(DEFAULT_LEECH_DOC_SLUG);
  public readonly resolvedDoc = input<LeechDoc | null>(null);

  protected readonly navItems = this.docsService.docs;
  protected readonly orderLink = "/leech/order";
  protected readonly doc = computed(() => this.resolvedDoc());
  protected readonly currentSlug = computed(
    () => this.doc()?.slug ?? this.slug() ?? DEFAULT_LEECH_DOC_SLUG,
  );

  protected readonly activeIndex = computed(() =>
    this.navItems.findIndex((item) => item.slug === this.currentSlug()),
  );

  protected readonly previousDoc = computed(() =>
    this.getSiblingDoc(this.activeIndex() - 1),
  );

  protected readonly nextDoc = computed(() =>
    this.getSiblingDoc(this.activeIndex() + 1),
  );

  protected getDocLink(slug: string): readonly string[] {
    return slug === DEFAULT_LEECH_DOC_SLUG ? ["/leech"] : ["/leech", slug];
  }

  protected getFragmentHref(fragment: string): string {
    return `${this.getDocLink(this.currentSlug()).join("/")}#${encodeURIComponent(fragment)}`;
  }

  protected scrollToFragment(event: MouseEvent, fragment: string): void {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
      return;
    }

    event.preventDefault();

    const element = this.document.getElementById(fragment);
    const windowRef = this.document.defaultView;

    if (!element || !windowRef) {
      return;
    }

    element.scrollIntoView({ block: "start" });
    windowRef.scrollBy({ top: -96, behavior: "auto" });
    windowRef.history.pushState(
      null,
      "",
      `${windowRef.location.pathname}${windowRef.location.search}#${encodeURIComponent(fragment)}`,
    );
  }

  private getSiblingDoc(index: number): LeechDocMeta | null {
    return this.navItems[index] ?? null;
  }
}
