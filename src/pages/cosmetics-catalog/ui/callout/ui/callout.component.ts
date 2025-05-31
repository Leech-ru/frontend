import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
  selector: "app-cosmetics-callout",
  templateUrl: "callout.component.html",
  styleUrl: "callout.component.less",
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppCalloutComponent {
  @Input({ required: true })
  public heading!: string;

  @Input({ required: true })
  public description!: string;
}
