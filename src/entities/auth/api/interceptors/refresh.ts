import { isPlatformServer } from "@angular/common";
import {
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpStatusCode,
} from "@angular/common/http";
import { inject, PLATFORM_ID } from "@angular/core";
import { catchError, switchMap, throwError } from "rxjs";
import { AuthService } from "../service";

export const authRefreshInterceptor: HttpInterceptorFn = (request, next) => {
  const auth = inject(AuthService);
  const platformId = inject(PLATFORM_ID);
  const isServer = isPlatformServer(platformId);

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      if (
        isServer ||
        error.status !== HttpStatusCode.Unauthorized ||
        request.url.includes("/auth/refresh")
      ) {
        return throwError(() => error);
      }
      return auth.refresh().pipe(switchMap(() => next(request)));
    }),
  );
};
