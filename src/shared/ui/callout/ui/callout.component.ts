import { Component, Input } from "@angular/core";
import { RouterLink } from "@angular/router";
import { TuiButton } from "@taiga-ui/core";

import { RoutePath } from "@/app/@x/route";

@Component({
  selector: "app-callout",
  templateUrl: "callout.component.html",
  styleUrl: "callout.component.less",
  imports: [RouterLink, TuiButton],
})
export class AppCalloutComponent {
  @Input({ required: true })
  public heading!: string;

  @Input({ required: true })
  public description!: string;

  @Input({ required: true })
  public action!: string;

  @Input({ required: true })
  public routerLink!: RoutePath;
}
