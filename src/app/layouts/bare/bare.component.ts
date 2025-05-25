import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-bare-layout",
  templateUrl: "bare.component.html",
  styleUrl: "bare.component.less",
  imports: [RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppBareLayoutComponent {}
