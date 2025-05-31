import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { TuiDataList } from "@taiga-ui/core";

import { RoutePath } from "@/app/@x/route";

@Component({
  selector: "app-header-drawer-link",
  templateUrl: "link.component.html",
  imports: [RouterLink, RouterLinkActive, TuiDataList],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHeaderDrawerLinkComponent {
  public label = input.required<string>();
  public routerLink = input.required<RoutePath>();
}
