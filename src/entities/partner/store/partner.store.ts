import { HttpErrorResponse } from "@angular/common/http";
import { inject } from "@angular/core";
import { tapResponse } from "@ngrx/operators";
import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { distinctUntilChanged, pipe, switchMap, tap } from "rxjs";

import {
  CreatePartnerRequest,
  Partner,
  PartnerFilters,
  PartnerService,
  UpdatePartnerRequest,
} from "@/entities/partner";

interface PartnerState {
  items: Partner[];
  selectedItem: Partner | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: PartnerState = {
  items: [],
  selectedItem: null,
  isLoading: false,
  error: null,
};

export const PartnerStore = signalStore(
  { providedIn: "root" },
  withState(initialState),
  withMethods((store, partnerService = inject(PartnerService)) => ({
    loadAll: rxMethod<PartnerFilters | undefined>(
      pipe(
        distinctUntilChanged(),
        tap(() => patchState(store, { isLoading: true })),
        switchMap((filters) =>
          partnerService.getAll(filters).pipe(
            tapResponse({
              next: (items) => {
                patchState(store, { items });
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

    loadById: rxMethod<string>(
      pipe(
        distinctUntilChanged(),
        tap(() => patchState(store, { isLoading: true })),
        switchMap((id) =>
          partnerService.getById(id).pipe(
            tapResponse({
              next: (selectedItem) => {
                patchState(store, { selectedItem });
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

    create: rxMethod<CreatePartnerRequest>(
      pipe(
        distinctUntilChanged(),
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap((data) =>
          partnerService.create(data).pipe(
            tapResponse({
              next: (newItem) => {
                patchState(store, {
                  items: [...store.items(), newItem],
                });
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

    update: rxMethod<{ id: string; data: UpdatePartnerRequest }>(
      pipe(
        distinctUntilChanged(),
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap(({ id, data }) =>
          partnerService.update(id, data).pipe(
            tapResponse({
              next: (updatedItem) => {
                patchState(store, {
                  items: store
                    .items()
                    .map((item) => (item.id === id ? updatedItem : item)),
                  selectedItem:
                    store.selectedItem()?.id === id
                      ? updatedItem
                      : store.selectedItem(),
                });
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

    delete: rxMethod<string>(
      pipe(
        distinctUntilChanged(),
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap((id) =>
          partnerService.delete(id).pipe(
            tapResponse({
              next: () => {
                patchState(store, {
                  items: store.items().filter((item) => item.id !== id),
                  selectedItem:
                    store.selectedItem()?.id === id
                      ? null
                      : store.selectedItem(),
                });
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

    clearSelected: () => {
      patchState(store, { selectedItem: null });
    },
  })),
);
