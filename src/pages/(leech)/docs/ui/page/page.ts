import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { TuiButton, TuiIcon, TuiLink } from "@taiga-ui/core";
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
    TuiIcon,
    TuiLink,
  ],
})
export class AppLeechDocsPageComponent {
  private readonly docsService = inject(LeechDocsService);

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

  private getSiblingDoc(index: number): LeechDocMeta | null {
    return this.navItems[index] ?? null;
  }
}
