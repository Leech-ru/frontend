import { ChangeDetectionStrategy, Component } from "@angular/core";
import { TuiAppearance, TuiTitle } from "@taiga-ui/core";
import { TuiAvatar } from "@taiga-ui/kit";
import { TuiCardLarge, TuiHeader } from "@taiga-ui/layout";

@Component({
  selector: "app-home-page-quality",
  templateUrl: "quality.component.html",
  styleUrl: "quality.component.less",
  imports: [TuiAppearance, TuiAvatar, TuiCardLarge, TuiHeader, TuiTitle],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHomePageQualityComponent {}
