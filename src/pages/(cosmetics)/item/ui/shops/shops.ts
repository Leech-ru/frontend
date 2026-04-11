import { Links } from "@/entities/cosmetic";
import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { RouterLink } from "@angular/router";
import { TuiButton } from "@taiga-ui/core";

@Component({
  selector: "app-cosmetic-item-shops",
  templateUrl: "shops.html",
  styleUrl: "shops.less",
  imports: [TuiButton, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppCosmeticsItemShopsComponent {
  public data = input<Links>({} as Links);
}
