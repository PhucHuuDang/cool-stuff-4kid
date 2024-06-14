import { carouselItems } from "@/db";
import { CardCarousel } from "@/components/card-carousel";
import { ProductInformationDetail } from "../_components/product-infomation-detail";
import { DescribeProduct } from "../_components/describe-product";

const ProductDetailPage = ({
  params,
}: {
  params: { productDetail: string };
}) => {
  const { productDetail } = params;

  return (
    <div className="2xl:max-w-screen pt-28">
      <div className="space-y-8 px-20 py-10">
        <ProductInformationDetail carouselItems={carouselItems} />

        <CardCarousel
          titleCard="Thường được mua cùng"
          carouselItems={carouselItems}
        />

        <CardCarousel
          titleCard="Sản phẩm tương tự"
          carouselItems={carouselItems}
        />

        <DescribeProduct />
      </div>
    </div>
  );
};

export default ProductDetailPage;
