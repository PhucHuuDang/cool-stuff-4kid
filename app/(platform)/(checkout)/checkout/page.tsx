import { checkAuthenticate } from "@/app/auth/check-authenticate";
import { redirect } from "next/navigation";
import { NavbarCheckout } from "../_components/navbar-checkout";
import { HeaderCheckout } from "../_components/header-checkout";
import { CheckoutInformation } from "../_components/checkout-information";

const CheckoutPage = async () => {
  const checkAuth = await checkAuthenticate();

  if (!checkAuth) {
    redirect("/");
  }

  return (
    <div className="2xl:max-w-screen pt-20">
      <>
        <NavbarCheckout />
        <HeaderCheckout />
        <div className="mt-5 px-10">
          <CheckoutInformation />
        </div>
      </>
    </div>
  );
};

export default CheckoutPage;
