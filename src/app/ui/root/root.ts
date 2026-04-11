import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { TuiRoot } from "@taiga-ui/core";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, TuiRoot],
  templateUrl: "root.html",
  styleUrl: "root.less",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppRootComponent {}
