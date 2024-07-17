// {
//   "addressId": 0,
//   "phone": "005000",
//   "addressName": "vinhome",
//   "street": "123 nguyen van tang",
//   "city": "HCM",
//   "country": "Vietnam",
//   "id": "8db1864e-e3ad-49a3-bb22-3c065886b137"
// }

export type AddressCreateProps = {
  addressName: string;
  street: string;
  phone: string;
  city: string;
  country: string;
  id: string;
};

export type AddressCreatedResponse = {
  data: null;
  isSuccess: boolean;
  message: string;
};

export type PaymentProps = PaymentPickData;

export type PaymentData = {
  userName: string;
  orderId: number;
  orderDate: string; // Assuming this is an ISO 8601 formatted date string
  status: number;
  totalPrice: number;
  voucherId: number;
  id: string; // UUID or GUID
  paymentUrl: string;
  orderDetails: {
    orderDetailId: number;
    quantity: number;
    productId: number;
    product: {
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
      id: string; // UUID or GUID
    };
  }[];
  fullName: string;
  email: string;
  voucher: null | any; // Assuming voucher can be any type or null
};

export type PaymentPickData = Pick<PaymentData, "paymentUrl">;

export type PaymentResponseProps = {
  isSucceed: boolean;
  message: string;
  data: PaymentPickData;
};
