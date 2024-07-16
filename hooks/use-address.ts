import { useLocalStorage } from "usehooks-ts";

export const useAddress = () => {
  const [address, setAddress, removeAddress] = useLocalStorage("address", "");

  return {
    address,
    setAddress,
    removeAddress,
  };
};
