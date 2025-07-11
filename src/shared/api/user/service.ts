import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";

import {
  UserLoginRequest,
  UserLoginResponse,
  UserRegisterationRequest,
  UserRegisterationResponse,
} from "./types";

@Injectable({ providedIn: "root" })
export class UserService {
  private readonly client = inject(HttpClient);

  public login(body: UserLoginRequest) {
    return this.client.post<UserLoginResponse>("/api/v1/user/login", body);
  }

  public register(body: UserRegisterationRequest) {
    return this.client.post<UserRegisterationResponse>(
      "/api/v1/user/register",
      body,
    );
  }

  public logout() {
    return this.client.post<UserRegisterationResponse>(
      "/api/v1/user/logout",
      null,
      { withCredentials: true },
    );
  }

  public get() {
    return this.client.get("/api/v1/user", { withCredentials: true });
  }
}
