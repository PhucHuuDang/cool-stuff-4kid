"use server";

import { revalidatePath } from "next/cache";
import { InputType, ReturnType } from "./types";
import axios from "axios";
import { createSafeActions } from "@/lib/create-safe-actions";
import { ReviewSafeTypes } from "./schema";
import { checkAuthenticate } from "@/app/auth/check-authenticate";
import { informationDecoded } from "@/app/auth/information-decoded";
import { removeMarks } from "@/handle-transform/remove-marks";

const handler = async (data: InputType): Promise<ReturnType> => {
  const auth = await checkAuthenticate();
  const information: any = await informationDecoded();

  if (!auth || !information) {
    return {
      errors: "You need to login first",
    };
  }

  const { productId, commentDetail, rating, productName } = data;

  console.log({ data });
  console.log(information.nameid);

  let review;

  console.log("Environment Variable:", process.env.NEXT_PRIVATE_API_URL);
  const commentId = 0;
  const userName =  "string"

  try {
    const res = await axios.post(
      `${process.env.NEXT_PRIVATE_API_URL}/Comment/CreateComment`,
      {
        commentId,
        productName,
        commentDetail,
        rating: rating ?? 0,
        productId,
        userName,
        id: information.nameid,
      },
    );

    if (res.status === 200) {
      review = res.data;
    }
  } catch (error) {
    return {
      errors: "Failed to review product",
    };
  }

  const transformedProductName = removeMarks(productName ?? "");

  revalidatePath(`${transformedProductName}/${productId}`);

  return {
    data: review,
  };
};

export const createReviewProduct = createSafeActions(ReviewSafeTypes, handler);
