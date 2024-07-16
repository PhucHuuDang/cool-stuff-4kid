import { z } from "zod";

const isValidPhone = (phone: string) =>
  /^(?:\+84|84|0)(3|5|7|8|9|1[2689])[0-9]{8}$/.test(phone);

export const AddressSafeTypes = z.object({
  addressName: z
    .string({
      required_error: "Địa chỉ nhà là bắt buộc",
      invalid_type_error: "Địa chỉ nhà không hợp lệ",
    })
    .min(5, {
      message: "Địa chỉ nhà phải có ít nhất 5 ký tự",
    })
    .max(50, {
      message: "Địa chỉ nhà chỉ được tối đa 50 ký tự",
    }),

  street: z
    .string({
      required_error: "Tên đường là bắt buộc",
      invalid_type_error: "Tên đường không hợp lệ",
    })
    .min(5, {
      message: "Tên đường phải có ít nhất 5 ký tự",
    })
    .max(50, {
      message: "Tên đường chỉ được tối đa 50 ký tự",
    }),

  city: z
    .string({
      required_error: "Thành phố là bắt buộc",
      invalid_type_error: "Thành phố không hợp lệ",
    })
    .min(5, {
      message: "Thành phố phải có ít nhất 5 ký tự",
    })
    .max(50, {
      message: "Thành phố chỉ được tối đa 50 ký tự",
    }),

  phone: z
    .string({
      required_error: "Số điện thoại là bắt buộc",
      invalid_type_error: "Số điện thoại không hợp lệ",
    })
    .refine(isValidPhone, {
      message: "Số điện thoại không hợp lệ",
    }),

  id: z.string({
    required_error: "Id là bắt buộc",
    invalid_type_error: "Id không hợp lệ",
  }),
});
