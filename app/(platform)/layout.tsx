import { DrawerCheckoutCart } from "./(home)/_components/cart/drawer-checkout-cart";
import { LoginModal } from "./_components/modal/login-modal";
import { Toaster } from "sonner";
import { RegisterModal } from "./_components/modal/register-modal";
import { QueryProviders } from "../providers/query-providers";

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <QueryProviders>
        <Toaster position="top-right" richColors closeButton />
        <LoginModal />
        <RegisterModal />
        <DrawerCheckoutCart />
        {children}
      </QueryProviders>
    </>
  );
};

export default PlatformLayout;
