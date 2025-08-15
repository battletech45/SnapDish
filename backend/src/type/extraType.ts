import { ResourceConsumption } from "./resourceType";

export type Extra = {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  maxQuantity: number;
  isRequired: boolean;
  imageUrl?: string;
  isActive: boolean;
  consumingResources?: ResourceConsumption[];
};
