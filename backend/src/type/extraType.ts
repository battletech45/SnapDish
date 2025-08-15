import { ResourceConsumption } from "./resourceType";

export type Extra = {
  name: string;
  basePrice: number;
  category: string;
  itemId?: string;
  isFranchiseExtra: boolean;
  isActive: boolean;
  maxQuantity: number;
  isRequired: boolean;
  description?: string;
  consumingResources?: ResourceConsumption[];
  createdAt: Date;
  updatedAt: Date;
};

export type LocalExtra = {
  name: string;
  price: number;
  category: string;
  isLocalExtra: boolean;
  isActive: boolean;
  maxQuantity: number;
  isRequired: boolean;
  description?: string;
  consumingResources?: ResourceConsumption[];
  createdAt: Date;
  updatedAt: Date;
};

export type ExtraPricing = {
  franchiseExtraId: string;
  localPrice: number;
  isActive: boolean;
  reason?: string;
  effectiveFrom: Date;
  createdAt: Date;
  updatedAt: Date;
};
