import { HttpErrorResponse } from "@angular/common/http";
import { inject } from "@angular/core";
import { tapResponse } from "@ngrx/operators";
import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { distinctUntilChanged, pipe, switchMap, tap } from "rxjs";

import { CreateOrderRequest, Order, OrderService } from "@/features/leech/buy";

interface OrderState {
  lastOrder: Order | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  lastOrder: null,
  isLoading: false,
  error: null,
};

export const OrderStore = signalStore(
  { providedIn: "root" },
  withState(initialState),
  withMethods((store, orderService = inject(OrderService)) => ({
    create: rxMethod<CreateOrderRequest>(
      pipe(
        distinctUntilChanged(),
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap((data) =>
          orderService.create(data).pipe(
            tapResponse({
              next: (lastOrder) => {
                patchState(store, { lastOrder });
              },
              error: (error: HttpErrorResponse) => {
                patchState(store, { error: error.message });
              },
              finalize: () => {
                patchState(store, { isLoading: false });
              },
            }),
          ),
        ),
      ),
    ),

    clearError: () => {
      patchState(store, { error: null });
    },

    clearLastOrder: () => {
      patchState(store, { lastOrder: null });
    },
  })),
);
