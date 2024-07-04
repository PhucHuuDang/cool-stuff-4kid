"use server";

import { LoginProps } from "@/actions/actions-types";
import { cookies } from "next/headers";

export const createCookie = async (token: LoginProps) => {
  cookies().set("cool_cookie", token.token);
  cookies().set("cool_cookie_refreshed", token.refreshToken);
};
export const getCookie = async () => {
  return cookies().get("cool_cookie");
};

export const deleteCookie = async () => {
  cookies().delete("cool_cookie");
};
