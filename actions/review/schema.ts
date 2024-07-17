import { z } from "zod";

export const ReviewSafeTypes = z.object({
  commentDetail: z
    .string({
      required_error: "Comment detail is required",
      invalid_type_error: "Comment detail must be a string",
    })
    .min(5, {
      message: "Comment detail must be at least 5 characters",
    })
    .max(250, {
      message: "Comment detail must be at most 200 characters",
    }),

  rating: z.number({}).optional(),
  productId: z.number({
    required_error: "Product ID is required",
    invalid_type_error: "Product ID must be a number",
  }),
  productName: z.string().optional(),
});

// {
//   "commentId": 0,
//   "commentDetail": "string",
//   "rating": 0,
//   "date": "2024-07-17T21:30:22.080Z",
//   "productId": 0,
//   "productName": "string",
//   "id": "string",
//   "userName": "string"
// }
