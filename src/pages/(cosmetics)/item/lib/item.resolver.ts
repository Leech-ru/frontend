import { HttpErrorResponse } from "@angular/common/http";
import { inject } from "@angular/core";
import { ResolveFn, Router } from "@angular/router";
import { TuiNotificationService } from "@taiga-ui/core";
import { catchError, EMPTY, map } from "rxjs";
import {
  CosmeticItem,
  CosmeticsService,
  getSelectedCosmeticFromDto,
} from "@/entities/cosmetic";

export const cosmeticItemResolver: ResolveFn<CosmeticItem> = (route) => {
  const service = inject(CosmeticsService);
  const router = inject(Router);
  const notifications = inject(TuiNotificationService);
  const id = route.paramMap.get("id")!;

  return service.getById(id).pipe(
    map((dto) => getSelectedCosmeticFromDto(dto)),
    catchError((error: HttpErrorResponse) => {
      if (error.status === 404) {
        notifications
          .open("Товар не найден", { label: "Ошибка", appearance: "negative" })
          .subscribe();
        router.navigate(["/cosmetics"]);
      }
      return EMPTY;
    }),
  );
};
