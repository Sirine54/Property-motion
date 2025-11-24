
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
  createdAt?: string | null;
};

export type CreatePropertyInput = {
  name: string;
  address?: string;
  city?: string;
  country?: string;
  postCode?: string;
  reference?: string;
  propertyValue?: number | string;
  propertyType?: string;
  accessProperty?: string;
  dimensions?: string;
  bedrooms?: number | string;
  bathrooms?: number | string;
  floors?: number | string;
  features?: Record<string, any> | string | null;
  imageFile?: File | null;
  ownerId?: string | null; 
};

