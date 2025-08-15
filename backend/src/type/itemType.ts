import { ResourceConsumption } from "./resourceType";

export type Item = {
  name: string;
  basePrice: number;
  category: string;
  description?: string;
  isFranchiseItem: boolean;
  isActive: boolean;
  isCustomizable: boolean;
  ingredients?: string[];
  preparationTime?: number;
  size?: string;
  consumingResources?: ResourceConsumption[];
  createdAt: Date;
  updatedAt: Date;
};

export type ItemPricing = {
  franchiseItemId: string;
  localPrice: number;
  isActive: boolean;
  reason?: string;
  effectiveFrom: Date;
  createdAt: Date;
  updatedAt: Date;
};
