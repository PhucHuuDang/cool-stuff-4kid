import { DataProducts } from "@/config";
import { CardProduct } from "./_components/card-product";
import Sidebar from "./_components/sidebar";

const HomePage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="2xl:max-w-screen pt-20">
      <div className="flex px-8 pt-8 gap-x-2">
        <div className="w-auto shrink-0 md:block hidden">
          <Sidebar />
        </div>

        <div className="pt-14 w-full h-full 2xl:h-screen overflow-y-auto">
          <div
            className="
             pt-20
             grid
             grid-cols-1
             sm:grid-cols-2
             md:grid-cols-3
             lg:grid-cols-4
             xl:grid-cols-5
             2xl:grid-cols-6
             gap-8
             "
          >
            {DataProducts.map((product) => (
              <CardProduct key={product.id} product={product} />
            ))}
          </div>
          {/* {children} */}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
