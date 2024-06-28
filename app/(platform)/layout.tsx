import { DrawerCheckoutCart } from "./(home)/_components/cart/drawer-checkout-cart";
import { LoginModal } from "./_components/modal/login-modal";
import { Toaster } from "sonner";
import { RegisterModal } from "./_components/modal/register-modal";

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Toaster position="top-right" richColors closeButton />
      <LoginModal />
      <RegisterModal />
      <DrawerCheckoutCart />
      {children}
    </>
  );
};

export default PlatformLayout;
