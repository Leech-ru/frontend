import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

import { User, UserLoginRequest, UserRegisterRequest } from "@/entities/user";

@Injectable({ providedIn: "root" })
export class UserService {
  private readonly client = inject(HttpClient);
  private readonly baseUrl = `/api/v1/user`;

  public login(body: UserLoginRequest) {
    return this.client.post<User>(`${this.baseUrl}/login`, body);
  }

  public register(body: UserRegisterRequest) {
    return this.client.post<User>(`${this.baseUrl}/register`, body);
  }

  public logout() {
    return this.client.post<User>(`${this.baseUrl}/logout`, null, {
      withCredentials: true,
    });
  }

  public get() {
    return this.client.get<User>(`${this.baseUrl}`, { withCredentials: true });
  }
}
