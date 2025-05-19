import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

import { LOGO_ROUTER_LINK } from "../../config/navigation.config";

@Component({
  selector: "app-header-logo",
  templateUrl: "logo.component.html",
  styleUrl: "logo.component.less",
  imports: [RouterLink],
})
export class AppHeaderLogoComponent {
  protected readonly logoRouterLink = LOGO_ROUTER_LINK;
}
