export interface RestrictionResponse {
    id: number;
    description: string;
}

export interface RestrictionRequest {
    description: string;
  }

export interface RestrictionFilter {
    description?: string;
 }
