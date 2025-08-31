import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

import {
  CategoryDto,
  CategoryFiltersDto,
  CosmeticDto,
  CosmeticsFiltersDto,
  CreateCategoryRequestDto,
  CreateCosmeticsRequestDto,
  UpdateCategoryRequestDto,
  UpdateCosmeticsRequestDto,
} from "@/entities/cosmetic";

@Injectable({ providedIn: "root" })
export class CosmeticsService {
  private readonly client = inject(HttpClient);
  private readonly baseUrl = `/api/v1/cosmetics`;

  public getAll(filters?: CosmeticsFiltersDto) {
    return this.client.get<CosmeticDto[]>(this.baseUrl, {
      params: filters as HttpParams,
      withCredentials: true,
    });
  }

  public getAllAdmin(filters?: CosmeticsFiltersDto) {
    return this.client.get<CosmeticDto[]>(`${this.baseUrl}/admin`, {
      params: filters as HttpParams,
      withCredentials: true,
    });
  }

  public getById(id: string) {
    return this.client.get<CosmeticDto>(`${this.baseUrl}/${id}`, {
      withCredentials: true,
    });
  }

  public create(body: CreateCosmeticsRequestDto) {
    return this.client.post<CosmeticDto>(this.baseUrl, body, {
      withCredentials: true,
    });
  }

  public update(id: string, body: UpdateCosmeticsRequestDto) {
    return this.client.patch<CosmeticDto>(`${this.baseUrl}/${id}`, body, {
      withCredentials: true,
    });
  }

  public delete(id: string) {
    return this.client.delete<void>(`${this.baseUrl}/${id}`, {
      withCredentials: true,
    });
  }
}

@Injectable({ providedIn: "root" })
export class CategoryService {
  private readonly client = inject(HttpClient);
  private readonly baseUrl = `/api/v1/category`;

  public getAll(filters?: CategoryFiltersDto) {
    return this.client.get<CategoryDto[]>(this.baseUrl, {
      params: filters as HttpParams,
      withCredentials: true,
    });
  }

  public getById(id: string) {
    return this.client.get<CategoryDto>(`${this.baseUrl}/${id}`, {
      withCredentials: true,
    });
  }

  public create(body: CreateCategoryRequestDto) {
    return this.client.post<CategoryDto>(this.baseUrl, body, {
      withCredentials: true,
    });
  }

  public update(id: string, body: Omit<UpdateCategoryRequestDto, "id">) {
    const payload: UpdateCategoryRequestDto = { ...body, id };
    return this.client.patch<CategoryDto>(`${this.baseUrl}/${id}`, payload, {
      withCredentials: true,
    });
  }

  public delete(id: string) {
    return this.client.delete<void>(`${this.baseUrl}/${id}`, {
      withCredentials: true,
    });
  }
}
