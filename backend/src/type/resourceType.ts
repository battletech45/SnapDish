export type ResourceUnit = "kg" | "g" | "l" | "ml" | "pcs" | "units";

export type Resource = {
  id: string;
  name: string;
  description?: string;
  unit: ResourceUnit;
  currentStock: number;
  minimumStock: number;
  costPerUnit: number;
  isActive: boolean;
  supplier?: string;
  lastRestocked?: Date;
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
