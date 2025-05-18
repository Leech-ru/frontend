import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Component, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { map } from "rxjs";

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
  private breakpointObserver = inject(BreakpointObserver);

  readonly isWebLandscape = toSignal(
    this.breakpointObserver
      .observe([Breakpoints.TabletLandscape, Breakpoints.WebLandscape])
      .pipe(map((result) => result.matches)),
    { requireSync: true },
  );
}
