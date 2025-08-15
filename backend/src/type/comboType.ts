export type Combo = {
  id: string;
  name: string;
  description?: string;
  basePrice: number;
  imageUrl?: string;
  discountPercentage: number;
  isActive: boolean;
  productIds: string[];
  validUntil?: Date;
  createdAt: Date;
  updatedAt: Date;
};
