import { ChangeDetectionStrategy, Component } from "@angular/core";
import { TuiTitle } from "@taiga-ui/core";
import { TuiHeader } from "@taiga-ui/layout";

@Component({
  templateUrl: "page.html",
  styleUrl: "page.less",
  imports: [TuiHeader, TuiTitle],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppAdminInfoPageComponent {}
