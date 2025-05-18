import { Component, inject } from "@angular/core";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-index-page",
  templateUrl: "index.page.component.html",
  styleUrl: "index.page.component.scss",
})
export class IndexPageComponent {
  protected readonly title = inject(Title);
}
