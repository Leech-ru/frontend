import { Component } from "@angular/core";

import { AppCosmeticsSearchComponent } from "@/features/cosmetics/search";
import { AppCalloutComponent } from "@/shared/ui/callout/ui/callout.component";

@Component({
  selector: "app-cosmetic-page",
  templateUrl: "page.component.html",
  styleUrl: "page.component.less",
  imports: [AppCalloutComponent, AppCosmeticsSearchComponent],
})
export class AppCosmeticsPageComponent {}
