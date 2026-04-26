import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from "@angular/core";
import { ActivatedRoute, RouterLink, RouterLinkActive } from "@angular/router";
import { TuiLoader } from "@taiga-ui/core";
import { MarkdownComponent, type LeechDoc } from "@/entities/leech-docs";
import { LeechDocsService } from "@/entities/leech-docs/api/service";

@Component({
  templateUrl: "page.html",
  styleUrl: "page.less",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TuiLoader, RouterLink, RouterLinkActive, MarkdownComponent],
})
export class AppLeechDocsPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly docsService = inject(LeechDocsService);

  protected doc = signal<LeechDoc | null>(null);
  protected isLoading = signal(true);

  constructor() {
    this.loadDoc();
  }

  private async loadDoc() {
    const slug = this.route.snapshot.paramMap.get("slug") || "index";
    const doc = await this.docsService.getDoc(slug);
    this.doc.set(doc);
    this.isLoading.set(false);
  }
}
