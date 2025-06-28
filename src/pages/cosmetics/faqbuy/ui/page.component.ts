import { ChangeDetectionStrategy, Component } from "@angular/core";
import { TuiAppearance, TuiLink, TuiTitle } from "@taiga-ui/core";
import { TuiAvatar } from "@taiga-ui/kit";
import { TuiCardLarge, TuiCell, TuiHeader } from "@taiga-ui/layout";

import { BUY_CONTACTS } from "@/pages/cosmetics/faqbuy/config";
import { AppCalloutComponent } from "@/shared/ui/callout";

@Component({
  selector: "app-faqbuy-page",
  templateUrl: "page.component.html",
  styleUrl: "page.component.less",
  imports: [
    AppCalloutComponent,
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
export class AppFaqBuyPageComponent {
  protected readonly services = BUY_CONTACTS;
}
