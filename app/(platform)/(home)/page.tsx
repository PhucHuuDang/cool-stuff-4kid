import { DataProducts } from "@/db";
import { CardProduct } from "./_components/card-product";
import Sidebar from "./_components/sidebar";
import { Cart } from "./_components/cart/cart";
import { CardCarouselHome } from "@/components/card-carousel-home";
import { VoucherCarousel } from "./_components/voucher-carousel";

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

  const vouchers = [
    {
      price: 20000,
      condition: "cho đơn hàng online từ 899k",
      product: "Tất cả sản phẩm",
      additionalInfo: "Trà sẵ cho trẻ dưới 24 tháng tuổi",
    },
    {
      price: 3000,
      condition: "cho đơn hàng online từ 1,299k",
      product: "Sản phẩm thời trang",
      additionalInfo: "Giày dép và phụ kiện",
    },
    {
      price: 5000,
      condition: "cho đơn hàng online từ 1,599k",
      product: "Đồ gia dụng",
      additionalInfo: "Nồi niêu xoong chảo",
    },
    {
      price: 1000,
      condition: "cho đơn hàng online từ 499k",
      product: "Sản phẩm chăm sóc cá nhân",
      additionalInfo: "Dầu gội và sữa tắm",
    },
    {
      price: 2000,
      condition: "cho đơn hàng online từ 899k",
      product: "Đồ chơi trẻ em",
      additionalInfo: "Đồ chơi giáo dục",
    },
    {
      price: 1000,
      condition: "cho đơn hàng online từ 699k",
      product: "Sản phẩm văn phòng phẩm",
      additionalInfo: "Bút và sổ tay",
    },
    {
      price: 3000,
      condition: "cho đơn hàng online từ 1,099k",
      product: "Đồ điện tử",
      additionalInfo: "Tai nghe và loa",
    },
    {
      price: 4000,
      condition: "cho đơn hàng online từ 1,499k",
      product: "Sản phẩm thể thao",
      additionalInfo: "Dụng cụ tập gym",
    },
    {
      price: 5000,
      condition: "cho đơn hàng online từ 1,999k",
      product: "Đồ nội thất",
      additionalInfo: "Bàn ghế và tủ kệ",
    },
    {
      price: 500,
      condition: "cho đơn hàng online từ 299k",
      product: "Đồ ăn nhẹ",
      additionalInfo: "Bánh kẹo và nước uống",
    },
  ];

  // console.log(vouchers);

  return (
    <div className="2xl:max-w-screen pt-20">
      <div className="flex gap-x-2 px-8 pt-8">
        <div className="hidden w-auto shrink-0 md:block">
          <Sidebar />
        </div>

        <div className="mb-4 h-full w-full overflow-hidden 2xl:h-screen">
          <CardCarouselHome
            carouselItems={urls}
            titleCard="Tuần lễ sự kiện"
            delay={5000}
          />

          <VoucherCarousel voucherItems={vouchers} titleCard="Nhận voucher" />

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
