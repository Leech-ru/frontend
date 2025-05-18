import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

import { AppHeaderNavigationComponent } from "../navigation/navigation.component";

@Component({
  selector: "app-header",
  templateUrl: "header.component.html",
  styleUrl: "header.component.scss",
  imports: [AppHeaderNavigationComponent, RouterLink],
})
export class AppHeaderComponent {}
