import { z } from "zod";

export const LoginSafeTypes = z.object({
  userName: z
    .string({
      required_error: "User name is required",
      invalid_type_error: "User name must be a string",
    })
    .min(5, {
      message: "User name must be at least 5 characters",
    })
    .max(50, {
      message: "User name must be at most 50 characters",
    }),

  password: z.string({
    required_error: "Password is required",
  }),
});
