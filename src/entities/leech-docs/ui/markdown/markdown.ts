import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-markdown",
  templateUrl: "markdown.html",
  styleUrl: "markdown.less",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarkdownComponent {
  private readonly sanitizer = inject(DomSanitizer);

  public readonly content = input.required<string>();

  protected readonly html = computed(() =>
    this.sanitizer.bypassSecurityTrustHtml(this.content()),
  );
}
