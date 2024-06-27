"use server";

import { cookies } from "next/headers";

export const createCookie = async (token: string) => {
  cookies().set("cool_cookie", token);
};
export const getCookie = async () => {
  return cookies().get("cool_cookie");
};

export const deleteCookie = async () => {
  cookies().delete("cool_cookie");
};
