export type Combo = {
  id: string;
  name: string;
  description?: string;
  restaurantId: string;
  imageUrl?: string;
  isActive: boolean;
  isCustomizable: boolean;
  productIds: string[]; // Array of item IDs in this combo
  discountPercentage?: number; // Optional discount for the combo
  createdAt: Date;
  updatedAt: Date;
};
