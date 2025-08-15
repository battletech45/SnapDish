import { Item } from "./itemType";
import { Combo } from "./comboType";

export type Menu = {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  sortOrder: number;
  items: Item[];
  combos: Combo[];
  availableDays?: AvailableDay[];
  isFranchiseMenu: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type AvailableDay = {
  day: string;
  isActive: boolean;
  discount?: number;
  availableHours?: AvailableHour[];
};

export type AvailableHour = {
  start: string;
  end: string;
};
