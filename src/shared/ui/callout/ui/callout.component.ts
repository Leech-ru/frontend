import {
  ChangeDetectionStrategy,
  Component,
  input,
  Input,
} from "@angular/core";
import { RouterLink } from "@angular/router";
import { TuiButton } from "@taiga-ui/core";

import { RoutePath } from "@/app/@x/route";

@Component({
  selector: "app-callout",
  templateUrl: "callout.component.html",
  styleUrl: "callout.component.less",
  imports: [RouterLink, TuiButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppCalloutComponent {
  public heading = input.required<string>();
  public description = input.required<string>();
  public action = input<string>();
  public link = input<RoutePath>();
}
