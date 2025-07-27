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

import {
  UserLoginRequest,
  UserRegisterRequest,
  UserService,
} from "@/entities/user";
import { User } from "@/entities/user/api/user.service.types";

interface UserState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  isLoading: false,
  error: null,
};

export const UserStore = signalStore(
  { providedIn: "root" },
  withState(initialState),
  withMethods((store, userService = inject(UserService)) => ({
    load: rxMethod<void>(
      pipe(
        distinctUntilChanged(),
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() =>
          userService.get().pipe(
            tapResponse({
              next: (user) => {
                patchState(store, { user });
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

    login: rxMethod<UserLoginRequest>(
      pipe(
        distinctUntilChanged(),
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap((credentials) =>
          userService.login(credentials).pipe(
            tapResponse({
              next: (user) => {
                patchState(store, { user });
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

    register: rxMethod<UserRegisterRequest>(
      pipe(
        distinctUntilChanged(),
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap((userData) =>
          userService.register(userData).pipe(
            tapResponse({
              next: (user) => {
                patchState(store, { user });
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

    logout: rxMethod<void>(
      pipe(
        distinctUntilChanged(),
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap(() =>
          userService.logout().pipe(
            tapResponse({
              next: () => {
                patchState(store, { user: null });
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

  withHooks({
    onInit(store) {
      store.load();
    },
  }),

  withComputed((store) => ({
    isAdmin: computed(() => {
      const user = store.user();
      return !!(user && user.role > 0);
    }),

    isSuperAdmin: computed(() => {
      const user = store.user();
      return !!(user && user.role === 3);
    }),
  })),
);
