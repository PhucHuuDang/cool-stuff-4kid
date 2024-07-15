import { checkAuthenticate } from "@/app/auth/check-authenticate";
import { DrawerCheckoutCart } from "./_components/cart/drawer-checkout-cart";
import NavbarHome from "./_components/navbar-home";
import { informationDecoded } from "@/app/auth/information-decoded";
import { getProducts } from "@/get-data-actions/get-products";
import { ProductApiProps } from "@/interface";

const HomeLayout = async ({ children }: { children: React.ReactNode }) => {
  const checkAuth = await checkAuthenticate();
  const products: ProductApiProps[] = await getProducts();

  const role = await informationDecoded();

  return (
    <div className="h-full bg-[#F5F7FD]">
      {/* <DrawerCheckoutCart /> */}
      <NavbarHome isAuthenticate={checkAuth} products={products} />
      {children}
    </div>
  );
};

export default HomeLayout;
