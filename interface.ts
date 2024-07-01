export interface Product {
  id: number;
  title: string;
  originalPrice: number;
  discountPrice: number;
  description: string;
  image: string;
  discountPercent: number;
  quantityOrder?: number;
}

export type UserInformation = {
  name: string;
  mail: string;
  role: string;
  status: string;
  date: string;
  price: string;
};
