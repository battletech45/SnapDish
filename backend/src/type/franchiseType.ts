export type Franchise = {
  id: string;
  name: string;
  ownerId: string; // Reference to admin user who owns this franchise
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};
