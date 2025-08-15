export type Menu = {
  name: string;
  description?: string;
  isFranchiseMenu: boolean;
  isActive: boolean;
  availableHours?: {
    start: string;
    end: string;
  };
  itemIds: string[];
  createdAt: Date;
  updatedAt: Date;
};

export type LocalMenu = {
  name: string;
  description?: string;
  isLocalMenu: boolean;
  isActive: boolean;
  availableHours?: {
    start: string;
    end: string;
  };
  availableDays?: string[];
  itemIds: string[];
  discount?: number;
  createdAt: Date;
  updatedAt: Date;
};
