import { Component } from "@angular/core";

import { HomePageOrderComponent } from "../order/order.component";

@Component({
  selector: "app-home-page",
  templateUrl: "page.component.html",
  imports: [HomePageOrderComponent],
})
export class AppHomePageComponent {}
