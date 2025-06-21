import { Component } from "@angular/core";

import { AppCategoryCardComponent } from "@/entities/cosmetic";
import { AppCosmeticsSearchComponent } from "@/features/cosmetics/search";
import { AppCalloutComponent } from "@/shared/ui/callout/ui/callout.component";

import { TEST_CATEGORY_CARDS } from "../../mock";

@Component({
  selector: "app-cosmetic-page",
  templateUrl: "page.component.html",
  styleUrl: "page.component.less",
  imports: [
    AppCalloutComponent,
    AppCosmeticsSearchComponent,
    AppCategoryCardComponent,
  ],
})
export class AppCosmeticsPageComponent {
  protected readonly categories = TEST_CATEGORY_CARDS;
}
