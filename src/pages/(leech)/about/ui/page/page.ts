import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  templateUrl: "page.html",
  styleUrl: "page.less",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppLeechAboutPageComponent {}
