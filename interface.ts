export interface Product {
  productId: string;
  productName: string;
  price: number;
  discountPrice: number;
  discountPercent: number;
  productDescription: string;
  image: string;
  imagesCarousel: string[];
  quantity: number;
  status: number;
  categoryId: number;
  originId: number;
  locationId: number;
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

export type ProductApiProps = Omit<Product, "imagesCarousel">;

export type ProductDetailProps = {
  productId: string;
  productName: string;
  price: number;
  discountPrice: number;
  discountPercent: number;
  productDescription: string;
  image: string;
  imagesCarousel: string[];
  quantity: number;
  status: number;
  categoryId: number;
  originId: number;
  locationId: number;
  quantityOrder?: number;
};

export type CardCarouselPropsPicked = Pick<
  ProductApiProps,
  "productId" | "price" | "discountPercent" | "productName" | "image"
>;
