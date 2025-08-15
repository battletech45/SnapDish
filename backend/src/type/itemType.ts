import { ResourceConsumption } from "./resourceType";

export type Item = {
  id: string;
  name: string;
  description?: string;
  basePrice: number;
  category: string;
  imageUrl?: string;
  isAvailable: boolean;
  isSingleSize: boolean;
  sizes?: Size[];
  isCustomizable: boolean;
  extras?: Extra[];
  isShared: boolean;
  consumingResources?: ResourceConsumption[];
  createdAt: Date;
  updatedAt: Date;
};

export type Size = {
  id: string;
  size: string;
  price: number;
};

export type Extra = {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  imageUrl?: string;
  isActive: boolean;
  consumingResources?: ResourceConsumption[];
  createdAt: Date;
  updatedAt: Date;
};
