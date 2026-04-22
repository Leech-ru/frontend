import { EMPTY_PAGINATION } from "@/shared/api";
import {
  InjectionToken,
  effect,
  inject,
  linkedSignal,
  resource,
  signal,
} from "@angular/core";
import { TuiTablePaginationEvent } from "@taiga-ui/addon-table";
import { lastValueFrom } from "rxjs";
import { UserService } from "../service";
import { UsersPagination } from "../types";

export const USERS_RESOURCE_PAGINATION_SIZES = [5, 10, 15, 30];

export const USERS_RESOURCE = new InjectionToken("Users Resource", {
  providedIn: "root",
  factory: () => {
    const userService = inject(UserService);

    const filters = signal({
      q: "",
      role: null,
      limit: USERS_RESOURCE_PAGINATION_SIZES[1],
    });

    const params = linkedSignal({
      source: filters,
      computation: (filters) => ({
        ...filters,
        offset: 0,
      }),
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

    const reset = () => {
      filters.update((filters) => ({
        ...filters,
        q: "",
        role: null,
      }));
    };

    const paginate = ({ page, size }: TuiTablePaginationEvent) => {
      if (size !== filters().limit) {
        filters.update((filters) => ({
          ...filters,
          limit: size,
        }));
      } else {
        params.update((params) => ({
          ...params,
          offset: page * size,
        }));
      }
    };

    return Object.assign(usersResource.asReadonly(), {
      reset,
      reload: usersResource.reload,
      filters,
      paginate,
      loaded: loaded.asReadonly(),
      params: params.asReadonly(),
      placeholder: placeholder.asReadonly(),
    });
  },
});
