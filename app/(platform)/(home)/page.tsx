import { DataProducts } from "@/db";
import { CardProduct } from "./_components/card-product";
import Sidebar from "./_components/sidebar";
import { Cart } from "./_components/cart/cart";

const HomePage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="2xl:max-w-screen pt-20">
      <div className="flex gap-x-2 px-8 pt-8">
        <div className="hidden w-auto shrink-0 md:block">
          <Sidebar />
        </div>

        <div className="h-full w-full overflow-y-auto pt-14 2xl:h-screen">
          <div className="grid grid-cols-1 gap-8 pt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {/* {DataProducts.map((product) => (
              <CardProduct key={product.id} product={product} />
            ))} */}

            <Cart product={DataProducts} />
          </div>
          {/* {children} */}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
