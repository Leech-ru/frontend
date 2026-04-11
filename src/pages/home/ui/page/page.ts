import { AppHeroComponent } from "@/shared/ui";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from "@angular/core";
import { Meta } from "@angular/platform-browser";
import { HOME_PAGE_CARDS } from "../../config/cards.config";
import { AppHomePageCardComponent } from "../card";
import { AppHomePageContactComponent } from "../contact";
import { AppHomePageQualityComponent } from "../quality";

@Component({
  templateUrl: "page.html",
  styleUrl: "page.less",
  imports: [
    AppHeroComponent,
    AppHomePageContactComponent,
    AppHomePageCardComponent,
    AppHomePageQualityComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHomePageComponent implements OnInit {
  protected readonly cards = HOME_PAGE_CARDS;
  protected readonly meta = inject(Meta);
  protected readonly description = "Piyavky)";

  public ngOnInit(): void {
    this.meta.addTag({ name: "description", content: this.description });
  }
}
