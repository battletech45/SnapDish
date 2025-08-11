export type Item = {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  imageUrl?: string;
  isAvailable: boolean;
  isSingleSize: boolean;
  sizes?: {
    size: string;
    price: number;
  }[];
  isCustomizable: boolean;
  customizations?: {
    name: string;
    price: number;
  }[];
  createdAt: Date;
  updatedAt: Date;
};
