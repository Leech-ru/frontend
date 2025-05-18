import { Component, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { TuiBreakpointService } from "@taiga-ui/core";

import { AppHeaderDrawerComponent } from "../drawer/drawer.component";
import { AppHeaderLogoComponent } from "../logo/logo.component";
import { AppHeaderNavigationComponent } from "../navigation/navigation.component";

@Component({
  selector: "app-header",
  templateUrl: "header.component.html",
  styleUrl: "header.component.scss",
  imports: [
    AppHeaderDrawerComponent,
    AppHeaderLogoComponent,
    AppHeaderNavigationComponent,
  ],
})
export class AppHeaderComponent {
  protected readonly breakpoint = toSignal(inject(TuiBreakpointService).pipe());
}
