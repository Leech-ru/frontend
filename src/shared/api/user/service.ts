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
  private readonly baseUrl = `/api/v1/user`;

  public login(body: UserLoginRequest) {
    return this.client.post<UserLoginResponse>(`${this.baseUrl}/login`, body);
  }

  public register(body: UserRegisterationRequest) {
    return this.client.post<UserRegisterationResponse>(
      `${this.baseUrl}/register`,
      body,
    );
  }

  public logout() {
    return this.client.post<UserRegisterationResponse>(
      `${this.baseUrl}/logout`,
      null,
      { withCredentials: true },
    );
  }

  public get() {
    return this.client.get(`${this.baseUrl}`, { withCredentials: true });
  }
}
