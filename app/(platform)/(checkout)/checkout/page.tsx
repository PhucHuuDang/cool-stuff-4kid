import { checkAuthenticate } from "@/app/auth/check-authenticate";
import { redirect } from "next/navigation";
import { NavbarCheckout } from "../_components/navbar-checkout";
import { HeaderCheckout } from "../_components/header-checkout";
import { CheckoutInformation } from "../_components/checkout-information";
import { ClientMounted } from "@/hooks/client-mounted";
import { informationDecoded } from "@/app/auth/information-decoded";
import { getData } from "@/get-data-actions/get-data";
import {
  InformationDecoded,
  UserInformationDetail,
  UserInformationDetailProps,
} from "@/interface";

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

  const information: any = await informationDecoded();

  console.log({ information });

  const userInformationDetail: UserInformationDetailProps = await getData(
    `/Users/GetUserById/${information.nameid}`,
  );

  // console.log({ userInformationDetail });

  return (
    <div className="2xl:max-w-screen pt-20">
      <>
        <NavbarCheckout />
        <HeaderCheckout />
        <div className="mt-5 px-10">
          <ClientMounted>
            <CheckoutInformation
              userInformationDetail={userInformationDetail}
            />
          </ClientMounted>
        </div>
      </>
    </div>
  );
};

export default CheckoutPage;
