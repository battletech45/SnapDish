export type Menu = {
  id: string;
  name: string;
  description?: string;
  restaurantId: string;
  imageUrl?: string;
  isActive: boolean;
  category: string; // e.g., "Lunch", "Dinner", "Breakfast", "All Day"
  sortOrder: number; // For ordering menus on display
  itemIds: string[]; // Array of individual item IDs
  comboIds: string[]; // Array of combo IDs
  createdAt: Date;
  updatedAt: Date;
};
