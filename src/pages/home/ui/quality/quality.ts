import { ChangeDetectionStrategy, Component } from "@angular/core";
import { TuiTitle } from "@taiga-ui/core";
import { TuiAvatar } from "@taiga-ui/kit";
import { TuiCardLarge, TuiHeader } from "@taiga-ui/layout";

@Component({
  selector: "app-home-page-quality",
  templateUrl: "quality.html",
  styleUrl: "quality.less",
  imports: [TuiCardLarge, TuiHeader, TuiTitle, TuiAvatar],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHomePageQualityComponent {}
