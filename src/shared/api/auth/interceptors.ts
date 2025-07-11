import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode,
} from "@angular/common/http";
import { inject, Injectable, InjectionToken } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, EMPTY, Observable, switchMap, throwError } from "rxjs";

import { AuthService } from "./service";

export const AUTH_REFRESH_FALLBACK_URL = new InjectionToken<string>(
  "Login page URL",
  {
    providedIn: "root",
    factory: () => "/",
  },
);

@Injectable()
export class AuthRefreshHttpInterceptor implements HttpInterceptor {
  protected readonly router = inject(Router);
  protected readonly authService = inject(AuthService);
  protected readonly fallbackUrl = inject(AUTH_REFRESH_FALLBACK_URL);

  public intercept(
    request: HttpRequest<unknown>,
    handler: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return handler.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (
          error.status !== HttpStatusCode.Unauthorized ||
          error.url?.includes("/login") ||
          error.url?.includes("/register") ||
          error.url?.includes("/logout")
        ) {
          return throwError(() => error);
        }

        return this.authService.refresh().pipe(
          switchMap(() => handler.handle(request)),
          catchError(() => {
            this.router.navigate([this.fallbackUrl]);

            return EMPTY;
          }),
        );
      }),
    );
  }
}
