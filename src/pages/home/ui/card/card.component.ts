import { NgOptimizedImage } from "@angular/common";
import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { RouterLink } from "@angular/router";
import { TuiAppearance, TuiLink, TuiTitle } from "@taiga-ui/core";
import { TuiCardLarge, TuiHeader } from "@taiga-ui/layout";

import { HomePageCard } from "../../model/cards.model";

@Component({
  selector: "app-home-page-card",
  templateUrl: "card.component.html",
  styleUrl: "card.component.less",
  imports: [RouterLink, TuiHeader, TuiLink, TuiTitle, NgOptimizedImage],
  hostDirectives: [
    { directive: TuiCardLarge },
    { directive: TuiAppearance, inputs: ["tuiAppearance: appearance"] },
  ],
  host: {
    "[class.fluid]": "card().fluid",
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHomePageCardComponent {
  public card = input.required<HomePageCard>();
}
