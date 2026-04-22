import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {
  CategoriesPagination,
  CategoryDto,
  CategoryFiltersDto,
  CosmeticDto,
  CosmeticsFiltersDto,
  CreateCategoryRequestDto,
  CreateCosmeticsRequestDto,
  UpdateCategoryRequestDto,
  UpdateCosmeticsRequestDto,
} from "./types";

export interface UploadImageResponse {
  id: string;
}

@Injectable({ providedIn: "root" })
export class CosmeticsService {
  private readonly client = inject(HttpClient);
  private readonly baseUrl = `/api/v1/cosmetics`;
  private readonly imageUrl = `/api/v1/image`;

  public uploadImage(file: File): Observable<UploadImageResponse> {
    const formData = new FormData();
    formData.append("file", file);
    return this.client.post<UploadImageResponse>(this.imageUrl, formData, {
      withCredentials: true,
    });
  }

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
  private readonly imageUrl = `/api/v1/image`;

  public uploadImage(file: File): Observable<UploadImageResponse> {
    const formData = new FormData();
    formData.append("file", file);
    return this.client.post<UploadImageResponse>(this.imageUrl, formData, {
      withCredentials: true,
    });
  }

  public getAll(filters: CategoryFiltersDto) {
    let httpParams = new HttpParams()
      .set("limit", filters.limit)
      .set("offset", filters.offset);

    return this.client.get<CategoriesPagination>(this.baseUrl, {
      params: httpParams,
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
