export type Restaurant = {
  id: string;
  name: string;
  address: string;
  phoneNumber: string;
  email: string;
  imageUrl?: string;
  managerId: string;
  openingHours: OpeningHour[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type OpeningHour = {
  day: string;
  open: string;
  close: string;
};
