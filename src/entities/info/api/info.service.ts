import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { API_URL } from "@/shared/api";
import { CorporationInfo, UpdateInfoRequest } from "./info.service.types";

@Injectable({ providedIn: "root" })
export class InfoService {
  private readonly client = inject(HttpClient);
  private readonly baseUrl = `${API_URL}/v1/info/corporation`;

  public get() {
    return this.client.get<CorporationInfo>(this.baseUrl);
  }

  public update(body: UpdateInfoRequest) {
    return this.client.patch<CorporationInfo>(this.baseUrl, body, {
      withCredentials: true,
    });
  }
}
