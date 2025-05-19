import { Component, inject, OnInit } from "@angular/core";
import { Meta } from "@angular/platform-browser";

import { AppCalloutComponent } from "@/shared/ui/callout";

import { HOME_PAGE_CARDS } from "../../config/cards.config";
import { AppHomePageCardComponent } from "../card/card.component";
import { AppHomePageQualityComponent } from "../quality/quality.component";

@Component({
  selector: "app-home-page",
  templateUrl: "page.component.html",
  styleUrl: "page.component.less",
  imports: [
    AppCalloutComponent,
    AppHomePageCardComponent,
    AppHomePageQualityComponent,
  ],
})
export class AppHomePageComponent implements OnInit {
  protected readonly cards = HOME_PAGE_CARDS;
  protected readonly meta = inject(Meta);
  protected readonly description = "Piyavky)";

  ngOnInit(): void {
    this.meta.addTag({ name: "description", content: this.description });
  }
}
