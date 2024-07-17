import { z } from "zod";

const OrderDetailTypes = z.object({
  productId: z.number({
    required_error: "Product ID is required",
    invalid_type_error: "Product ID must be a string",
  }),
  quantity: z.number({
    required_error: "Quantity is required",
    invalid_type_error: "Quantity must be a number",
  }),
});

export const PaymentSafeTypes = z.object({
  id: z.string({
    required_error: "Bạn cần đăng nhập",
    invalid_type_error: "Id must be a string",
  }),
  orderDetails: z.array(OrderDetailTypes).nonempty({
    message: "Không có sản phẩm nào trong đơn hàng",
  }),
  voucherId: z.number().optional(),
  addressShipping: z.string({
    required_error:
      "ĐỊa chỉ giao hàng là bắt buộc, hãy thêm địa chỉ giao hàng của bạn",
    invalid_type_error: "Address shipping must be a string",
  }),
});
