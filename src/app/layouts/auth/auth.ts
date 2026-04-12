import { isPlatformServer } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  PLATFORM_ID,
} from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";
import { TuiButton, TuiLoader } from "@taiga-ui/core";
import { TuiBlockStatus } from "@taiga-ui/layout";

@Component({
  imports: [RouterOutlet, RouterLink, TuiBlockStatus, TuiButton, TuiLoader],
  templateUrl: "auth.html",
  styleUrl: "auth.less",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppAuthLayoutComponent {
  protected readonly platform = inject(PLATFORM_ID);
  protected readonly isServer = computed(() => isPlatformServer(this.platform));
}
