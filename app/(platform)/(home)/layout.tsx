import { checkAuthenticate } from "@/app/auth/check-authenticate";
import { DrawerCheckoutCart } from "./_components/cart/drawer-checkout-cart";
import NavbarHome from "./_components/navbar-home";

const HomeLayout = async ({ children }: { children: React.ReactNode }) => {
  const checkAuth = await checkAuthenticate();

  return (
    <div className="h-full bg-[#F5F7FD]">
      {/* <DrawerCheckoutCart /> */}
      <NavbarHome isAuthenticate={checkAuth} />
      {children}
    </div>
  );
};

export default HomeLayout;
