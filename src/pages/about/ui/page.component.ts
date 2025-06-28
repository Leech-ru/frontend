import { Component } from "@angular/core";
import { TuiLink } from "@taiga-ui/core";

import { DOCUMENT_FOOTER, DOCUMENTS } from "@/pages/about/config";
import { AppCalloutComponent } from "@/shared/ui/callout";

@Component({
  selector: "app--about-page",
  imports: [AppCalloutComponent, TuiLink],
  templateUrl: "page.component.html",
  styleUrl: "page.component.less",
})
export class AppAboutPageComponent {
  protected readonly documents = DOCUMENTS;
  protected readonly document_footer = DOCUMENT_FOOTER;
}
