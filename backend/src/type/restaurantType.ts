export type Restaurant = {
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  managerId: string;
  isActive: boolean;
  openingHours: {
    monday: { open: string; close: string };
    tuesday: { open: string; close: string };
    wednesday: { open: string; close: string };
    thursday: { open: string; close: string };
    friday: { open: string; close: string };
    saturday: { open: string; close: string };
    sunday: { open: string; close: string };
  };
  createdAt: Date;
  updatedAt: Date;
};
