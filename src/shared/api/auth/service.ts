import { HttpClient } from "@angular/common/http";
import { Injectable, inject, signal } from "@angular/core";
import { Observable, finalize, throwError } from "rxjs";

@Injectable({ providedIn: "root" })
export class AuthService {
  private readonly client = inject(HttpClient);
  private readonly refreshing = signal(false);

  public refresh(): Observable<unknown> {
    if (this.refreshing()) {
      return throwError(() => new Error("Refresh already in progress"));
    }

    this.refreshing.set(true);

    return this.client
      .post("/api/v1/auth/refresh", null, {
        params: { goyda: true },
        withCredentials: true,
      })
      .pipe(
        finalize(() => {
          this.refreshing.set(false);
        }),
      );
  }
}
