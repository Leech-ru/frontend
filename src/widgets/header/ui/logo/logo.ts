import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-header-logo",
  templateUrl: "logo.html",
  styleUrl: "logo.less",
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHeaderLogoComponent {}
