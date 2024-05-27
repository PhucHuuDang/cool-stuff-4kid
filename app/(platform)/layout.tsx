import { DrawerCheckoutCart } from "./(home)/_components/cart/drawer-checkout-cart";
import { LoginModal } from "./_components/modal/login-modal";

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <LoginModal />
      <DrawerCheckoutCart />
      {children}
    </>
  );
};

export default PlatformLayout;
