"use server";

import { revalidatePath } from "next/cache";
import { InputType, ReturnType } from "./types";
import axios from "axios";
import { createSafeActions } from "@/lib/create-safe-actions";
import { LoginSafeTypes } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userName, password } = data;

  let loginAccount;

  console.log("Environment Variable:", process.env.NEXT_PRIVATE_API_URL);

  try {
    const res = await axios.post(
      `${process.env.NEXT_PRIVATE_API_URL}/Auth/Login`,
      {
        userName,
        password,
      },
    );

    if (res.status === 200) {
      loginAccount = res.data;
    }
  } catch (error) {
    return {
      errors: "Failed to register",
    };
  }

  revalidatePath("/");

  return {
    data: loginAccount,
  };
};

export const loginAccount = createSafeActions(LoginSafeTypes, handler);
