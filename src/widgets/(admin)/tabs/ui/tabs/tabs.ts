import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  signal,
  viewChildren,
} from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { TuiFade, TuiTabs } from "@taiga-ui/kit";

@Component({
  templateUrl: "tabs.html",
  styleUrl: "tabs.less",
  imports: [RouterLink, RouterLinkActive, TuiTabs, TuiFade],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppAdminTabsComponent {
  protected readonly activeItemIndex = signal(0);
  protected readonly tabs = viewChildren<ElementRef<HTMLElement>>("tab");

  constructor() {
    effect(() => {
      const index = this.activeItemIndex();
      const element = this.tabs()[index]?.nativeElement;

      requestAnimationFrame(() => {
        element?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      });
    });
  }
}
