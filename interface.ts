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

export type ProductApiProps = {
  productId: string;
  productName: string;
  price: number;
  discountPrice: number;
  discountPercent: number;
  productDescription: string;
  image: string;
  quantity: number;
  status: number;
  categoryId: number;
  originId: number;
  locationId: number;
  quantityOrder?: number;
};

export type ProductDetailProps = {
  productId: string;
  productName: string;
  price: number;
  discountPrice: number;
  discountPercent: number;
  productDescription: string;
  image: string;
  quantity: number;
  status: number;
  categoryId: number;
  originId: number;
  locationId: number;
  quantityOrder?: number;
};
