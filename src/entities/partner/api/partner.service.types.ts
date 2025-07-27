export interface Partner {
  id: string;
  name: string;
  description?: string;
}

export interface CreatePartnerRequest {
  name: string;
  description?: string;
}

export interface UpdatePartnerRequest {
  name?: string;
  description?: string;
}

export interface PartnerFilters {
  limit?: number;
  offset?: number;
}
