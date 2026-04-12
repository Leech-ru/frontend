import {
  AppCosmeticCategoryCardComponent,
  TEST_CATEGORY_CARDS,
} from "@/entities/cosmetic";
import { AppHeroComponent } from "@/shared/ui";
import { Component } from "@angular/core";

@Component({
  templateUrl: "page.html",
  styleUrl: "page.less",
  imports: [AppHeroComponent, AppCosmeticCategoryCardComponent],
})
export class AppCosmeticsCatalogPageComponent {
  protected readonly categories = TEST_CATEGORY_CARDS;
}
