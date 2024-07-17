type Product = {
  productId: number;
  productName: string;
  price: number;
  discountPrice: number | null;
  discountPercent: number;
  productDescription: string;
  image: string;
  imagesCarousel: string[];
  quantity: number;
  status: number;
  categoryId: number;
  originId: number;
  locationId: number;
  id: string | null;
};

type OrderDetail = {
  orderDetailId: number;
  quantity: number;
  productId: number;
  product: Product;
};

type Voucher = {
  voucherId: number;
  code: string;
  discountPercent: number;
  quantity: number;
  dateFrom: string;
  dateTo: string;
  vouchersStatus: number;
};

type Order = {
  userName: string;
  orderId: number;
  orderDate: string;
  status: number;
  totalPrice: number;
  voucherId: number;
  id: string;
  paymentUrl: string | null;
  orderDetails: OrderDetail[];
  fullName: string;
  email: string;
  voucher: Voucher;
};

export type PaymentDetailByUserID = {
  paymentId: number;
  transactionId: string;
  amount: number;
  status: number;
  paymentUrl: string;
  orderId: string;
  order: Order;
};
