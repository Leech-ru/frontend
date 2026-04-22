import { EMPTY_PAGINATION } from "@/shared/api";
import {
  InjectionToken,
  effect,
  inject,
  linkedSignal,
  resource,
  signal,
} from "@angular/core";
import { lastValueFrom } from "rxjs";
import { UserService } from "../service";
import { UserGetAllParams, UsersPagination } from "../types";

export const USERS_RESOURCE_PAGINATION_SIZES = [5, 10, 15, 30];

export const USERS_RESOURCE = new InjectionToken("Users Resource", {
  providedIn: "root",
  factory: () => {
    const userService = inject(UserService);

    const params = signal<UserGetAllParams>({
      q: "",
      role: null,
      limit: USERS_RESOURCE_PAGINATION_SIZES[1],
      offset: 0,
    });

    const usersResource = resource({
      params,
      loader: async ({ params }) => {
        try {
          return (await lastValueFrom(userService.getAll(params))) ?? [];
        } catch {
          return null;
        }
      },
      defaultValue: null,
    });

    const placeholder = linkedSignal<UsersPagination | null, UsersPagination>({
      source: usersResource.value,
      computation: (next, previous) =>
        next ??
        previous?.value ?? {
          items: [],
          pagination: EMPTY_PAGINATION,
        },
    });

    const loaded = signal(false);

    effect(() => {
      if (usersResource.status() === "resolved") {
        loaded.set(true);
      }
    });

    return Object.assign(usersResource, {
      placeholder,
      loaded,
      params,
    });
  },
});
