import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

@Component({
  selector: "app-markdown",
  template: `
    <article class="markdown-content" [innerHTML]="html()"></article>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .markdown-content {
        line-height: 1.6;
        color: var(--tui-text-primary);
      }
      .markdown-content :deep(h1) {
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 1.5rem;
        color: var(--tui-text-primary);
      }
      .markdown-content :deep(h2) {
        font-size: 1.5rem;
        font-weight: 600;
        margin-top: 2rem;
        margin-bottom: 1rem;
        color: var(--tui-text-primary);
      }
      .markdown-content :deep(h3) {
        font-size: 1.25rem;
        font-weight: 600;
        margin-top: 1.5rem;
        margin-bottom: 0.75rem;
        color: var(--tui-text-primary);
      }
      .markdown-content :deep(p) {
        margin-bottom: 1rem;
      }
      .markdown-content :deep(ul),
      .markdown-content :deep(ol) {
        margin-bottom: 1rem;
        padding-left: 1.5rem;
      }
      .markdown-content :deep(li) {
        margin-bottom: 0.5rem;
      }
      .markdown-content :deep(strong) {
        font-weight: 600;
      }
      .markdown-content :deep(em) {
        font-style: italic;
      }
      .markdown-content :deep(a) {
        color: var(--tui-primary);
        text-decoration: none;
      }
      .markdown-content :deep(a:hover) {
        text-decoration: underline;
      }
      .markdown-content :deep(blockquote) {
        border-left: 4px solid var(--tui-primary);
        padding-left: 1rem;
        margin: 1rem 0;
        font-style: italic;
        color: var(--tui-text-secondary);
      }
      .markdown-content :deep(hr) {
        border: none;
        border-top: 1px solid var(--tui-border-normal);
        margin: 2rem 0;
      }
      .markdown-content :deep(table) {
        width: 100%;
        border-collapse: collapse;
        margin: 1rem 0;
      }
      .markdown-content :deep(th),
      .markdown-content :deep(td) {
        border: 1px solid var(--tui-border-normal);
        padding: 0.5rem 1rem;
        text-align: left;
      }
      .markdown-content :deep(th) {
        background: var(--tui-background-base);
        font-weight: 600;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarkdownComponent {
  private readonly sanitizer = inject(DomSanitizer);

  readonly content = input.required<string>();

  protected html(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.content());
  }
}
