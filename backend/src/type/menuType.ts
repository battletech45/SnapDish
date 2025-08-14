export type Menu = {
  id: string;
  name: string;
  description?: string;
  restaurantId: string;
  imageUrl?: string;
  isActive: boolean;
  isCustomizable: boolean;
  productIds: string[]; // Array of item IDs in this menu
  createdAt: Date;
  updatedAt: Date;
};
