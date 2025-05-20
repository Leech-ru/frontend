import { ChangeDetectionStrategy, Component } from "@angular/core";

import { AppContactComponent } from "@/widgets/contact";

@Component({
  selector: "app-contact-page",
  templateUrl: "page.component.html",
  styleUrl: "page.component.less",
  imports: [AppContactComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppContactPageComponent {}
