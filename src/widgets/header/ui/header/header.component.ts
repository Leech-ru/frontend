import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

import { LOGO_ROUTER_LINK } from "../../config/navigation.config";
import { AppHeaderNavigationComponent } from "../navigation/navigation.component";

@Component({
  selector: "app-header",
  templateUrl: "header.component.html",
  styleUrl: "header.component.scss",
  imports: [AppHeaderNavigationComponent, RouterLink],
})
export class AppHeaderComponent {
  protected readonly logoRouterLink = LOGO_ROUTER_LINK;
}
