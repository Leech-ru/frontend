import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { RouterLink } from "@angular/router";
import { TuiAppearance, TuiTitle } from "@taiga-ui/core";
import { TuiCardLarge, TuiHeader } from "@taiga-ui/layout";
import { HomePageCard } from "../../model/cards.model";

@Component({
  selector: "app-home-page-card",
  templateUrl: "card.html",
  styleUrl: "card.less",
  imports: [RouterLink, TuiAppearance, TuiCardLarge, TuiHeader, TuiTitle],
  host: {
    "[class.fluid]": "card().fluid",
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHomePageCardComponent {
  public card = input.required<HomePageCard>();
}
