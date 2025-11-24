
export type Property = {
  id: string;
  name: string;
  description?: string | null;
  images?: string[];
  address?: string | null;
  price?: number | null;
  createdAt?: string | null;
  ownerId?: string | null;
};

export type PropertyState = {
  properties: Property[];
  setProperties: (items: Property[]) => void;
  addProperty: (item: Property) => void;
  updateProperty: (id: string, patch: Partial<Property>) => void;
  removeProperty: (id: string) => void;
};
