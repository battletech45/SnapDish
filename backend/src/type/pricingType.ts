export type ItemPricing = {
  id: string;
  franchiseItemId: string;
  localPrice: number;
  isActive: boolean;
  reason?: string; // Why the price is different
  effectiveFrom: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type ExtraPricing = {
  id: string;
  franchiseExtraId: string;
  localPrice: number;
  isActive: boolean;
  reason?: string; // Why the price is different
  effectiveFrom: Date;
  createdAt: Date;
  updatedAt: Date;
};
