import { AppCosmeticCategoryCardComponent } from "@/entities/cosmetic";
import { AppHeroComponent } from "@/shared/ui";
import { Component } from "@angular/core";
import { TEST_CATEGORY_CARDS } from "../../mock";

@Component({
  templateUrl: "page.html",
  styleUrl: "page.less",
  imports: [AppHeroComponent, AppCosmeticCategoryCardComponent],
})
export class AppCosmeticsCatalogPageComponent {
  protected readonly categories = TEST_CATEGORY_CARDS;
}
