import { Component } from "@angular/core";

import { AppCalloutComponent } from "@/shared/ui/callout";

import { HOME_PAGE_CARDS } from "../../config/cards.config";
import { AppHomePageCardComponent } from "../card/card.component";

@Component({
  selector: "app-home-page",
  templateUrl: "page.component.html",
  styleUrl: "page.component.less",
  imports: [AppCalloutComponent, AppHomePageCardComponent],
})
export class AppHomePageComponent {
  protected readonly cards = HOME_PAGE_CARDS;
}
