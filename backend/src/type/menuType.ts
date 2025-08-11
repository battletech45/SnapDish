import { Item } from "./itemType";

export type Menu = {
  id: string;
  name: string;
  description?: string;
  restaurantId: string;
  imageUrl?: string;
  isActive: boolean;
  isCustomizable: boolean;
  productIds: string[]; // Changed from products: Item[] to productIds: string[]
  createdAt: Date;
  updatedAt: Date;
};
