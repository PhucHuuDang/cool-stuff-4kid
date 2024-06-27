import { z } from "zod";

export const RegisterSafeTypes = z.object({
  fullName: z
    .string({
      required_error: "Full name is required",
      invalid_type_error: "Full name must be a string",
    })
    .min(5, {
      message: "Full name must be at least 5 characters",
    })
    .max(50, {
      message: "Full name must be at most 50 characters",
    }),
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

  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email({
      message: "Email is invalid",
    }),
  password: z.string({
    required_error: "Password is required",
  }),
});
