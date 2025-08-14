export type UserRole = 'admin' | 'user';

export type User = {
  uid: string;
  email?: string;
  displayName?: string;
  photoURL?: string;
  emailVerified?: boolean;
  phoneNumber?: string;
  role: UserRole;
  ownedRestaurants?: string[]; // Array of restaurant IDs owned by admin
  createdAt: Date;
  updatedAt: Date;
};
