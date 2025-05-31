import { Component } from "@angular/core";

import { AppCalloutComponent } from "@/shared/ui/callout/ui/callout.component";

@Component({
  selector: "app-cosmetics-page",
  templateUrl: "page.component.html",
  styleUrl: "page.component.less",
  imports: [AppCalloutComponent],
})
export class AppCosmeticsPageComponent {}
