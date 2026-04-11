import { AppHeroComponent } from "@/shared/ui";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { TuiAppearance, TuiCell, TuiLink, TuiTitle } from "@taiga-ui/core";
import { TuiAvatar } from "@taiga-ui/kit";
import { TuiCardLarge, TuiHeader } from "@taiga-ui/layout";
import { BUY_CONTACTS } from "../../config";

@Component({
  templateUrl: "page.html",
  styleUrl: "page.less",
  imports: [
    AppHeroComponent,
    TuiAppearance,
    TuiAvatar,
    TuiCardLarge,
    TuiCell,
    TuiHeader,
    TuiTitle,
    TuiLink,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppCosmeticsFaqbuyPageComponent {
  protected readonly services = BUY_CONTACTS;
}
