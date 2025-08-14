export type Item = {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  imageUrl?: string;
  isAvailable: boolean;
  isSingleSize: boolean;
  sizes?: {
    size: string;
    price: number;
  }[];
  isCustomizable: boolean;
  customizations?: {
    name: string;
    price: number;
  }[];
  restaurantId: string; // Which restaurant created this item
  isShared: boolean; // If true, can be used by other restaurants owned by same admin
  sharedWithRestaurants?: string[]; // Array of restaurant IDs that can use this item
  createdAt: Date;
  updatedAt: Date;
};
