import { DrawerCheckoutCart } from "./(home)/_components/cart/drawer-checkout-cart";

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <DrawerCheckoutCart />
      {children}
    </>
  );
};

export default PlatformLayout;
