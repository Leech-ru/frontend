import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { RouterLink } from "@angular/router";
import { TuiButton } from "@taiga-ui/core";

@Component({
  selector: "app-hero",
  templateUrl: "hero.html",
  styleUrl: "hero.less",
  imports: [RouterLink, TuiButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHeroComponent {
  public heading = input.required<string>();
  public description = input.required<string>();
  public action = input<string>();
  public link = input<string>();
}
