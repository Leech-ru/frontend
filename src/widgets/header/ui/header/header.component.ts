import { ChangeDetectionStrategy, Component } from "@angular/core";

import { AppHeaderDrawerComponent } from "../drawer/drawer.component";
import { AppHeaderLogoComponent } from "../logo/logo.component";
import { AppHeaderNavigationComponent } from "../navigation/navigation.component";

@Component({
  selector: "app-header",
  templateUrl: "header.component.html",
  styleUrl: "header.component.less",
  imports: [
    AppHeaderDrawerComponent,
    AppHeaderLogoComponent,
    AppHeaderNavigationComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHeaderComponent {}
