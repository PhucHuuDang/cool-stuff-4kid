import { DataProducts } from "@/db";
import { CardProduct } from "./_components/card-product";
import Sidebar from "./_components/sidebar";
import { Cart } from "./_components/cart/cart";
import { CardCarouselHome } from "@/components/card-carousel-home";

const HomePage = ({ children }: { children: React.ReactNode }) => {
  const urls = [
    {
      url: "/images/clothes-event.png",
    },
    {
      url: "/images/shopping-event.png",
    },
    {
      url: "/images/shopping-event-milk.png",
    },
  ];

  return (
    <div className="2xl:max-w-screen pt-20">
      <div className="flex gap-x-2 px-8 pt-8">
        <div className="hidden w-auto shrink-0 md:block">
          <Sidebar />
        </div>

        <div className="mb-4 h-full w-full pt-14 2xl:h-screen">
          <CardCarouselHome
            carouselItems={urls}
            titleCard="Tuần lễ sự kiện"
            delay={5000}
          />

          <div className="grid grid-cols-1 gap-8 py-10 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
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
