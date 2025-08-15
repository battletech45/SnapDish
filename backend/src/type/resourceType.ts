export type ResourceUnit = "kg" | "g" | "l" | "ml" | "pcs" | "units" | "liters";

export type Resource = {
  name: string;
  currentStock: number;
  unit: ResourceUnit;
  supplier: string;
  costPerUnit: number;
  minimumStock: number;
  lastRestocked?: Date;
  expiryDate?: Date;
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
  reason?: string;
  date: Date;
};
