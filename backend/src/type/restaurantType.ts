import { ResourceConsumption } from "./resourceType";

export type Restaurant = {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  managerId: string;
  isActive: boolean;
  openingHours: OpeningHours;
  createdAt: Date;
  updatedAt: Date;
};

export type OpeningHours = {
  monday: DayHours;
  tuesday: DayHours;
  wednesday: DayHours;
  thursday: DayHours;
  friday: DayHours;
  saturday: DayHours;
  sunday: DayHours;
};

export type DayHours = {
  open: string;
  close: string;
};

// Local items specific to a restaurant
export type LocalItem = {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  isLocalItem: boolean;
  isActive: boolean;
  ingredients?: string[];
  preparationTime?: number;
  size?: string;
  alcoholic?: boolean;
  consumingResources: ResourceConsumption[];
  createdAt: Date;
};

// Local menus specific to a restaurant
export type LocalMenu = {
  id: string;
  name: string;
  description: string;
  isLocalMenu: boolean;
  isActive: boolean;
  availableHours: {
    start: string;
    end: string;
  };
  availableDays: string[];
  itemIds: string[];
  discount?: number;
  createdAt: Date;
};

// Local extras specific to a restaurant
export type LocalExtra = {
  id: string;
  name: string;
  price: number;
  category: string;
  isLocalExtra: boolean;
  isActive: boolean;
  maxQuantity: number;
  isRequired: boolean;
  description: string;
  consumingResources: ResourceConsumption[];
  createdAt: Date;
};

// Item pricing for franchise items at specific restaurants
export type ItemPricing = {
  id: string;
  franchiseItemId: string;
  localPrice: number;
  isActive: boolean;
  reason: string;
  effectiveFrom: Date;
  createdAt: Date;
};

// Extra pricing for franchise extras at specific restaurants
export type ExtraPricing = {
  id: string;
  franchiseExtraId: string;
  localPrice: number;
  isActive: boolean;
  reason: string;
  effectiveFrom: Date;
  createdAt: Date;
};
