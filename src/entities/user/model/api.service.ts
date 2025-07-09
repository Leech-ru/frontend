import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

import {
  UserRegisterationRequest,
  UserRegisterationResponse,
} from "../api/types";

@Injectable({ providedIn: "root" })
export class UserAPIService {
  protected readonly http = inject(HttpClient);

  public register(body: UserRegisterationRequest) {
    return this.http.post<UserRegisterationResponse>(
      "/api/v1/user/register",
      body,
    );
  }
}
