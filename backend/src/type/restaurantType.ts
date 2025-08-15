export type Restaurant = {
  id: string;
  name: string;
  description?: string;
  address?: string;
  phoneNumber?: string;
  email?: string;
  imageUrl?: string;
  ownerId: string; // Reference to admin user who owns this restaurant
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};
