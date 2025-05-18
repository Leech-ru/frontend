import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { TuiButton } from "@taiga-ui/core";

import { RoutePath } from "@/app/@x/route";

@Component({
  selector: "app-home-page-order",
  templateUrl: "order.component.html",
  styleUrl: "order.component.less",
  imports: [TuiButton, RouterLink],
})
export class HomePageOrderComponent {
  protected readonly routerLink = "cosmetics/buy" as const satisfies RoutePath;
}
