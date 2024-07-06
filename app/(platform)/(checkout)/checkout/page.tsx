import { checkAuthenticate } from "@/app/auth/check-authenticate";
import { redirect } from "next/navigation";
import { NavbarCheckout } from "../_components/navbar-checkout";
import { HeaderCheckout } from "../_components/header-checkout";
import { CheckoutInformation } from "../_components/checkout-information";
import { ClientMounted } from "@/hooks/client-mounted";

export async function generateMetadata() {
  return {
    title: "Checkout",
    description: "Checkout",
  };
}

const CheckoutPage = async () => {
  // Todo: should move it to layout
  const checkAuth = await checkAuthenticate();
  if (!checkAuth) {
    return redirect("/");
  }

  return (
    <div className="2xl:max-w-screen pt-20">
      <>
        <NavbarCheckout />
        <HeaderCheckout />
        <div className="mt-5 px-10">
          <ClientMounted>
            <CheckoutInformation />
          </ClientMounted>
        </div>
      </>
    </div>
  );
};

export default CheckoutPage;
