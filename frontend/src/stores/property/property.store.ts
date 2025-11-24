import { create } from 'zustand';
import type { PropertyState, Property } from './property.types';

export const usePropertyStore = create<PropertyState>((set) => ({
  properties: [],

  setProperties: (items: Property[]) => set({ properties: items }),

  addProperty: (item: Property) => set((s) => ({ properties: [item, ...s.properties] })),

  updateProperty: (id: string, patch: Partial<Property>) =>
    set((s) => ({
      properties: s.properties.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    })),

  removeProperty: (id: string) =>
    set((s) => ({ properties: s.properties.filter((p) => p.id !== id) })),

  clearProperties: () => set({ properties: [] }),
}));

export default usePropertyStore;
