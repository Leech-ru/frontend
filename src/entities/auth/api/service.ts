import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { finalize, Observable, throwError } from "rxjs";

@Injectable({ providedIn: "root" })
export class AuthService {
  private readonly client = inject(HttpClient);
  private readonly refreshing = signal(false);
  private readonly baseUrl = `/api/v1/auth`;

  public refresh(): Observable<unknown> {
    if (this.refreshing()) {
      return throwError(() => new Error("Refresh already in progress"));
    }

    this.refreshing.set(true);

    return this.client
      .post(`${this.baseUrl}/refresh`, null, {
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
