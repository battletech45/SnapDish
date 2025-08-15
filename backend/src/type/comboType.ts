import { ResourceConsumption } from "./resourceType";

export type Combo = {
  name: string;
  description?: string;
  basePrice: number;
  discount: number;
  isFranchiseCombo: boolean;
  isActive: boolean;
  items: ResourceConsumption[];
  validUntil?: Date;
  createdAt: Date;
  updatedAt: Date;
};
