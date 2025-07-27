import { HttpErrorResponse } from "@angular/common/http";
import { inject } from "@angular/core";
import { tapResponse } from "@ngrx/operators";
import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { pipe, switchMap, tap } from "rxjs";

import {
  UserLoginRequest,
  UserRegisterRequest,
  UserService,
} from "@/entities/user";
import { User } from "@/entities/user/api/types";

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
    loadUser: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap(() =>
          userService.get().pipe(
            tapResponse(
              (user) => {
                patchState(store, {
                  user,
                  isLoading: false,
                });
              },
              (error: HttpErrorResponse) => {
                patchState(store, {
                  user: null,
                  isLoading: false,
                  error: error.message,
                });
              },
            ),
          ),
        ),
      ),
    ),

    login: rxMethod<UserLoginRequest>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap((credentials) =>
          userService.login(credentials).pipe(
            switchMap(() => userService.get()),
            tapResponse(
              (user) => {
                patchState(store, {
                  user,
                  isLoading: false,
                });
              },
              (error: HttpErrorResponse) => {
                patchState(store, {
                  isLoading: false,
                  error: error.message,
                });
              },
            ),
          ),
        ),
      ),
    ),

    register: rxMethod<UserRegisterRequest>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap((userData) =>
          userService.register(userData).pipe(
            switchMap(() => userService.get()),
            tapResponse(
              (user) => {
                patchState(store, {
                  user,
                  isLoading: false,
                });
              },
              (error: HttpErrorResponse) => {
                patchState(store, {
                  isLoading: false,
                  error: error.message,
                });
              },
            ),
          ),
        ),
      ),
    ),

    logout: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap(() =>
          userService.logout().pipe(
            tapResponse(
              () => {
                patchState(store, {
                  user: null,
                  isLoading: false,
                });
              },
              (error: HttpErrorResponse) => {
                patchState(store, {
                  isLoading: false,
                  error: error.message,
                });
              },
            ),
          ),
        ),
      ),
    ),

    clearError: () => {
      patchState(store, { error: null });
    },
  })),
);
