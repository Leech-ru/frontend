import { computed, inject, Injectable } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { NavigationEnd, Router } from "@angular/router";
import { filter, map, startWith } from "rxjs";

@Injectable({ providedIn: "root" })
export class RouterDataService {
  private readonly router = inject(Router);

  private readonly data = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      startWith(null),
      map(() => {
        let route = this.router.routerState.snapshot.root;
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route.data;
      }),
    ),
    { initialValue: {} as any },
  );

  public get(key: string, defaultValue: unknown = undefined) {
    return computed(() => this.data()[key] ?? defaultValue);
  }
}
