import { checkAuthenticate } from "@/app/auth/check-authenticate";
import { DrawerCheckoutCart } from "./_components/cart/drawer-checkout-cart";
import NavbarHome from "./_components/navbar-home";
import { informationDecoded } from "@/app/auth/information-decoded";

const HomeLayout = async ({ children }: { children: React.ReactNode }) => {
  const checkAuth = await checkAuthenticate();

  const role = await informationDecoded();

  return (
    <div className="h-full bg-[#F5F7FD]">
      {/* <DrawerCheckoutCart /> */}
      <NavbarHome isAuthenticate={checkAuth} />
      {children}
    </div>
  );
};

export default HomeLayout;