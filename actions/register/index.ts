"use server";

import { revalidatePath } from "next/cache";
import { InputType, ReturnType } from "./types";
import axios from "axios";
import { createSafeActions } from "@/lib/create-safe-actions";
import { RegisterSafeTypes } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userName, fullName, email, password } = data;

  let registerAccount;

  try {
    const res = await axios.post(
      `${process.env.NEXT_PRIVATE_API_URL}/Auth/Register`,
      {
        userName,
        fullName,
        email,
        password,
      },
    );

    if (res.status === 200) {
      registerAccount = res.data;
    }
  } catch (error) {
    return {
      errors: "Failed to register",
    };
  }

  revalidatePath("/");

  return {
    data: registerAccount,
  };
};

export const registerAccount = createSafeActions(RegisterSafeTypes, handler);
