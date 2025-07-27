import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

import {
  CreatePartnerRequest,
  Partner,
  PartnerFilters,
  UpdatePartnerRequest,
} from "@/entities/partner";

@Injectable({ providedIn: "root" })
export class PartnerService {
  private readonly client = inject(HttpClient);
  private readonly baseUrl = `/api/v1/partner`;

  public getAll(filters?: PartnerFilters) {
    return this.client.get<Partner[]>(this.baseUrl, {
      params: filters as HttpParams,
      withCredentials: true,
    });
  }

  public getById(id: string) {
    return this.client.get<Partner>(`${this.baseUrl}/${id}`, {
      withCredentials: true,
    });
  }

  public create(body: CreatePartnerRequest) {
    return this.client.post<Partner>(this.baseUrl, body, {
      withCredentials: true,
    });
  }

  public update(id: string, body: UpdatePartnerRequest) {
    return this.client.patch<Partner>(`${this.baseUrl}/${id}`, body, {
      withCredentials: true,
    });
  }

  public delete(id: string) {
    return this.client.delete<void>(`${this.baseUrl}/${id}`, {
      withCredentials: true,
    });
  }
}
