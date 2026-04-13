import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";
import { TuiButton } from "@taiga-ui/core";

@Component({
  imports: [RouterOutlet, RouterLink, TuiButton],
  templateUrl: "auth.html",
  styleUrl: "auth.less",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppAuthLayoutComponent {}
