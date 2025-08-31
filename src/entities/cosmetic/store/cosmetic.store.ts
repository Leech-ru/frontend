import { it } from "node:test";

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
  CategoryDto,
  CategoryFiltersDto,
  CategoryService,
  CosmeticDto,
  CosmeticsFiltersDto,
  CosmeticsService,
  CreateCategoryRequestDto,
  CreateCosmeticsRequestDto,
  UpdateCategoryRequestDto,
  UpdateCosmeticsRequestDto,
} from "@/entities/cosmetic";
import {
  getCategoriesCardsFromDto,
  getCosmeticCardsFromDto,
  getSelectedCosmeticFromDto,
} from "@/entities/cosmetic/model/cosmetic.converter";

interface CosmeticsState {
  items: CosmeticDto[];
  categories: CategoryDto[];
  selectedCategory: CategoryDto | null;
  selectedItem: CosmeticDto | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: CosmeticsState = {
  items: [],
  selectedItem: null,
  categories: [],
  selectedCategory: null,
  isLoading: false,
  error: null,
};

const initialCosmeticFilters: CosmeticsFiltersDto = {
  limit: 1000,
  offset: 0,
};

const initialCategoriesFilters: CategoryFiltersDto = {
  limit: 1000,
  offset: 0,
};

export const CosmeticsStore = signalStore(
  { providedIn: "root" },
  withState(initialState),
  withMethods(
    (
      store,
      cosmeticsService = inject(CosmeticsService),
      categoryService = inject(CategoryService),
    ) => ({
      loadAll: rxMethod<CosmeticsFiltersDto | undefined>(
        pipe(
          distinctUntilChanged(),
          tap(() => patchState(store, { isLoading: true })),
          switchMap((filters) =>
            cosmeticsService.getAll(filters).pipe(
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

      loadAllAdmin: rxMethod<CosmeticsFiltersDto | undefined>(
        pipe(
          distinctUntilChanged(),
          tap(() => patchState(store, { isLoading: true })),
          switchMap((filters) =>
            cosmeticsService.getAllAdmin(filters).pipe(
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
            cosmeticsService.getById(id).pipe(
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

      create: rxMethod<CreateCosmeticsRequestDto>(
        pipe(
          distinctUntilChanged(),
          tap(() => patchState(store, { isLoading: true, error: null })),
          switchMap((data) =>
            cosmeticsService.create(data).pipe(
              tapResponse({
                next: (newItem) => {
                  patchState(store, { items: [...store.items(), newItem] });
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

      update: rxMethod<{ id: string; data: UpdateCosmeticsRequestDto }>(
        pipe(
          distinctUntilChanged(),
          tap(() => patchState(store, { isLoading: true, error: null })),
          switchMap(({ id, data }) =>
            cosmeticsService.update(id, data).pipe(
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
            cosmeticsService.delete(id).pipe(
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

      loadCategories: rxMethod<CategoryFiltersDto | undefined>(
        pipe(
          distinctUntilChanged(),
          tap(() => patchState(store, { isLoading: true })),
          switchMap((filters) =>
            categoryService.getAll(filters).pipe(
              tapResponse({
                next: (categories) => {
                  patchState(store, { categories });
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

      loadCategoryById: rxMethod<string>(
        pipe(
          distinctUntilChanged(),
          tap(() => patchState(store, { isLoading: true })),
          switchMap((id) =>
            categoryService.getById(id).pipe(
              tapResponse({
                next: (selectedCategory) => {
                  patchState(store, { selectedCategory });
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

      createCategory: rxMethod<CreateCategoryRequestDto>(
        pipe(
          distinctUntilChanged(),
          tap(() => patchState(store, { isLoading: true, error: null })),
          switchMap((data) =>
            categoryService.create(data).pipe(
              tapResponse({
                next: (newCategory) => {
                  patchState(store, {
                    categories: [...store.categories(), newCategory],
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

      updateCategory: rxMethod<{
        id: string;
        data: Omit<UpdateCategoryRequestDto, "id">;
      }>(
        pipe(
          distinctUntilChanged(),
          tap(() => patchState(store, { isLoading: true, error: null })),
          switchMap(({ id, data }) =>
            categoryService.update(id, data).pipe(
              tapResponse({
                next: (updatedCategory) => {
                  patchState(store, {
                    categories: store
                      .categories()
                      .map((c) => (c.id === id ? updatedCategory : c)),
                    selectedCategory:
                      store.selectedCategory()?.id === id
                        ? updatedCategory
                        : store.selectedCategory(),
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

      deleteCategory: rxMethod<string>(
        pipe(
          distinctUntilChanged(),
          tap(() => patchState(store, { isLoading: true, error: null })),
          switchMap((id) =>
            categoryService.delete(id).pipe(
              tapResponse({
                next: () => {
                  patchState(store, {
                    categories: store.categories().filter((c) => c.id !== id),
                    selectedCategory:
                      store.selectedCategory()?.id === id
                        ? null
                        : store.selectedCategory(),
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
    }),
  ),
  withComputed(({ items, categories, selectedItem }) => ({
    cosmeticCards: computed(() => getCosmeticCardsFromDto(items())),
    categoriesCards: computed(() => getCategoriesCardsFromDto(categories())),
    selectedCosmetic: computed(() => {
      const item = selectedItem();

      if (item) {
        return getSelectedCosmeticFromDto(item);
      }

      return {};
    }),
  })),

  withHooks({
    onInit(store) {
      store.loadAll(initialCosmeticFilters);
      store.loadCategories(initialCategoriesFilters);
    },
  }),
);
