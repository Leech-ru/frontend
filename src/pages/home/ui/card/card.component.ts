import { NgOptimizedImage } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { RouterLink } from "@angular/router";
import { TuiAppearance, TuiLink, TuiTitle } from "@taiga-ui/core";
import { TuiCardLarge, TuiHeader } from "@taiga-ui/layout";

import { RoutePath } from "@/app/@x/route";

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
    "[class.fluid]": "fluid",
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHomePageCardComponent implements HomePageCard {
  @Input({ required: true })
  public thumbnail!: string;

  @Input({ required: true })
  public heading!: string;

  @Input({ required: true })
  public description!: string;

  @Input({ required: true })
  public action!: string;

  @Input({ required: true })
  public link!: RoutePath;

  @Input()
  public fluid: boolean | null | undefined = null;
}
