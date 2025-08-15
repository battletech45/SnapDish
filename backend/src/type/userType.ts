export type UserRole = 'admin' | 'user' | 'manager';

export type User = {
  uid: string;
  email?: string;
  displayName?: string;
  photoURL?: string;
  emailVerified?: boolean;
  phoneNumber?: string;
  role: UserRole;
  ownedFranchises?: string[];
  managedRestaurants?: string[];
  createdAt: Date;
  updatedAt: Date;
};
