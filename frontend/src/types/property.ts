
export type Property = {
  id: string;
  uid?: string | null;
  name: string;
  image?: string | null;
  imageUrl?: string | null;
  address?: string | null;
  city?: string | null;
  country?: string | null;
  postCode?: string | null;
  reference?: string | null;
  propertyValue?: number | null;
  propertyType?: string | null;
  accessProperty?: string | null;
  dimensions?: string | null;
  bedrooms?: number | null;
  bathrooms?: number | null;
  floors?: number | null;
  features?: any;
  ownerId?: string | null;
  propertyOn?:string;
  createdAt?: string | null;
};

export interface CreatePropertyInput {
  name: string;
  address: string;
  city: string;
  country?: string;
  postCode?: string;
  reference?: string;
  propertyValue?: string | number;
  propertyType?: string;
  accessProperty?: string;
  dimensions?: string;
  bedrooms?: number;
  bathrooms?: number;
  floors?: number;
  features?: Record<string, boolean> | string;
  imageFile?: File;
  ownerId?: string;
  propertyOn?: 'sale' | 'let';
}
