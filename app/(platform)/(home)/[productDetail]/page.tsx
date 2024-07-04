import { DataProducts, carouselItems } from "@/db";
import { CardCarousel } from "@/components/card-carousel";
import { ProductInformationDetail } from "../_components/product-infomation-detail";
import { DescribeProduct } from "../_components/describe-product";
import { EvaluateProduct } from "../_components/evaluate-product";
import { Review } from "../_components/review";
import { removeMarks } from "@/handle-transform/remove-marks";
import { Product } from "@/interface";

const ProductDetailPage = ({
  params,
}: {
  params: { productDetail: string };
}) => {
  const { productDetail } = params;

  const productDetailByTitle = DataProducts.find((item) => {
    const removeMarksTitle = removeMarks(item.title);
    return removeMarksTitle === productDetail;
  });

  return (
    <div className="2xl:max-w-screen pt-28">
      <div className="space-y-8 px-20 py-10">
        <ProductInformationDetail
          carouselItems={carouselItems}
          productDetailByTitle={productDetailByTitle!}
        />

        <CardCarousel
          titleCard="Thường được mua cùng"
          carouselItems={carouselItems}
        />

        <CardCarousel
          titleCard="Sản phẩm tương tự"
          carouselItems={carouselItems}
        />

        <DescribeProduct />

        <EvaluateProduct />

        <Review />
      </div>
    </div>
  );
};

export default ProductDetailPage;
