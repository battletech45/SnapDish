export type ResourceUnit = "kg" | "g" | "l" | "ml" | "pcs" | "units";

export type Resource = {
  id: string;
  name: string;
  description?: string;
  unit: ResourceUnit;
  currentStock: number;
  minimumStock: number; // Alert threshold
  costPerUnit: number; // Cost per unit for inventory tracking
  category: string; // e.g., 'beverages', 'ingredients', 'packaging'
  restaurantId: string; // Which restaurant owns this resource
  isActive: boolean;
  lastRestocked?: Date;
  supplier?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ResourceConsumption = {
  resourceId: string;
  quantity: number;
  unit: ResourceUnit;
};

export type ResourceStockUpdate = {
  resourceId: string;
  quantity: number;
  operation: "add" | "subtract" | "set";
  reason?: string; // e.g., 'restock', 'consumption', 'waste'
  date: Date;
};
