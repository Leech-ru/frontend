import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { map } from "rxjs";

import {
  CosmeticItem,
  CosmeticsService,
  getSelectedCosmeticFromDto,
} from "@/entities/cosmetic";

export const cosmeticItemResolver: ResolveFn<CosmeticItem> = (route) => {
  const service = inject(CosmeticsService);
  const id = route.paramMap.get("id")!;

  return service
    .getById(id)
    .pipe(map((dto) => getSelectedCosmeticFromDto(dto)));
};
