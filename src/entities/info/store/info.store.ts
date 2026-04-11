import { HttpErrorResponse } from "@angular/common/http";
import { computed, inject } from "@angular/core";
import { tapResponse } from "@ngrx/operators";
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from "@ngrx/signals";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { distinctUntilChanged, pipe, switchMap, tap } from "rxjs";
import { CorporationInfo, UpdateInfoRequest } from "../api/info.service.types";
import { InfoService } from "../api/info.service";
import {
  getPhonesFromDto,
  getEmailFromDto,
  getSitesFromDto,
} from "../model/converters";

interface InfoState {
  info: CorporationInfo | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: InfoState = {
  info: null,
  isLoading: false,
  error: null,
};

export const InfoStore = signalStore(
  { providedIn: "root" },
  withState(initialState),
  withMethods((store, infoService = inject(InfoService)) => ({
    load: rxMethod<void>(
      pipe(
        distinctUntilChanged(),
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() =>
          infoService.get().pipe(
            tapResponse({
              next: (info) => {
                patchState(store, { info });
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

    update: rxMethod<UpdateInfoRequest>(
      pipe(
        distinctUntilChanged(),
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap((data) =>
          infoService.update(data).pipe(
            tapResponse({
              next: (info) => {
                patchState(store, { info });
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
  })),
  withComputed(({ info }) => ({
    phones: computed(() => {
      const links = info()?.links;
      if (links) {
        return getPhonesFromDto(links);
      }
      return [];
    }),
    email: computed(() => {
      const links = info()?.links;
      if (links) {
        return getEmailFromDto(links);
      }
      return [];
    }),
    sites: computed(() => {
      const links = info()?.links;
      if (links) {
        return getSitesFromDto(links);
      }
      return [];
    }),
  })),
  withHooks({
    onInit(store) {
      store.load();
    },
  }),
);
