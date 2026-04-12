import {
  AppCosmeticCategoryCardComponent,
  TEST_CATEGORY_CARDS,
} from "@/entities/cosmetic";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { TuiButton, TuiTitle } from "@taiga-ui/core";
import { TuiHeader } from "@taiga-ui/layout";

@Component({
  templateUrl: "page.html",
  styleUrl: "page.less",
  imports: [TuiHeader, TuiTitle, AppCosmeticCategoryCardComponent, TuiButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppAdminCosmeticsPageComponent {
  protected readonly categories = TEST_CATEGORY_CARDS;
}
