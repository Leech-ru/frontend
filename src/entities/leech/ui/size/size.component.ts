import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { TuiFormatNumberPipe } from "@taiga-ui/core";

@Component({
  selector: "app-leech-size",
  templateUrl: "size.component.html",
  imports: [AsyncPipe, TuiFormatNumberPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppLeechSizeComponent {
  public size = input.required<number>();
}
