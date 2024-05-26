import { DrawerCheckoutCart } from "./_components/cart/drawer-checkout-cart";
import NavbarHome from "./_components/navbar-home";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      {/* <DrawerCheckoutCart /> */}
      <NavbarHome />
      {children}
    </div>
  );
};

export default HomeLayout;
