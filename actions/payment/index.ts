"use server";

import { checkAuthenticate } from "@/app/auth/check-authenticate";
import { InputType, ReturnType } from "./types";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { createSafeActions } from "@/lib/create-safe-actions";
import { PaymentSafeTypes } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const auth = await checkAuthenticate();
  const { id, orderDetails, voucherId } = data;

  if (!auth) {
    return {
      errors: "You need to login first",
    };
  }

  console.log(`${process.env.NEXT_PRIVATE_API_URL}/Order/CreateOrder`);
  console.log({ data });

  console.log(JSON.stringify(data));

  let payment;

  try {
    console.log("run");
    const res = await axios.post(
      `${process.env.NEXT_PRIVATE_API_URL}/Order/CreateOrder`,
      {
        id,
        orderDetails,
        voucherId,
      },
    );

    console.log({ res });

    if (res.status === 200) {
      payment = res.data;
    }
  } catch (error) {
    return {
      errors: "Failed to Payment",
    };
  }

  revalidatePath("/checkout");

  return {
    data: payment,
  };
};

export const handlePaymentAction = createSafeActions(PaymentSafeTypes, handler);
