import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";
import { TuiTitle } from "@taiga-ui/core";
import { TuiFade, TuiTabs } from "@taiga-ui/kit";
import { TuiHeader } from "@taiga-ui/layout";

@Component({
  templateUrl: "admin.html",
  styleUrl: "admin.less",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, TuiHeader, TuiTitle, TuiTabs, RouterLink, TuiFade],
})
export class AppAdminLayoutComponent {}
