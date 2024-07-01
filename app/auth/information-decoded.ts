import { getCookie } from "@/store/actions";
import { JwtPayload, jwtDecode } from "jwt-decode";

export const informationDecoded = async () => {
  const token = await getCookie();

  if (!token) {
    return false;
  }

  const informationResponse = jwtDecode<JwtPayload>(token.value);

  return informationResponse;
};
