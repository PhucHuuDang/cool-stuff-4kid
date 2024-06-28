import { getCookie } from "@/store/actions";

export const checkAuthenticate = async () => {
  const token = await getCookie();

  if (!token) {
    return false;
  }

  return true;
};
