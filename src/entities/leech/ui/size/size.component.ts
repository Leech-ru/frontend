import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { TuiFormatNumberPipe } from "@taiga-ui/core";

@Component({
  selector: "app-leech-size",
  templateUrl: "size.component.html",
  imports: [AsyncPipe, TuiFormatNumberPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppLeechSizeComponent {
  @Input({ required: true })
  public size!: number;
}
