"use server";

import { checkAuthenticate } from "@/app/auth/check-authenticate";
import { InputType } from "./types";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { createSafeActions } from "@/lib/create-safe-actions";
import { AddressSafeTypes } from "./schema";

const handler = async (data: InputType) => {
  const auth = await checkAuthenticate();
  const { addressName, street, city, phone, id } = data;

  if (!auth) {
    return {
      errors: "You need to login first",
    };
  }

  const country = "Việt Nam";

  // console.log({ data });

  let address;

  try {
    const res = await axios.post(
      `${process.env.NEXT_PRIVATE_API_URL}/Address/CreateAddress`,
      {
        addressName,
        street,
        city,
        phone,
        id,
        country,
      },
    );

    if (res.status === 200) {
      address = res.data;
    }
  } catch (error) {
    return {
      errors: "Failed to Add more address",
    };
  }

  revalidatePath("/checkout");

  return {
    data: address,
  };
};

export const addAddress = createSafeActions(AddressSafeTypes, handler);
