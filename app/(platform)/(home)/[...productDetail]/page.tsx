import { DataProducts, carouselItems } from "@/db";
import { CardCarousel } from "@/components/card-carousel";
import { ProductInformationDetail } from "../_components/product-infomation-detail";
import { DescribeProduct } from "../_components/describe-product";
import { EvaluateProduct } from "../_components/evaluate-product";
import { Review } from "../_components/review";
import { removeMarks } from "@/handle-transform/remove-marks";
import { Product, ProductDetailProps } from "@/interface";
import { getData } from "@/get-data-actions/get-data";

const ProductDetailPage = async ({
  params,
}: {
  params: { productDetail: string };
}) => {
  const { productDetail } = params;

  console.log({ productDetail });

  const idProduct = Number(productDetail.slice(1).toString());

  const getProductDetailInformation: ProductDetailProps = await getData(
    `/Product/GetProductsById/${idProduct}`,
  );

  console.log({ getProductDetailInformation });

  return (
    <div className="2xl:max-w-screen pt-28">
      <div className="space-y-8 px-20 py-10">
        <ProductInformationDetail
          carouselItems={carouselItems}
          productDetail={getProductDetailInformation}
        />

        <CardCarousel
          titleCard="Thường được mua cùng"
          carouselItems={carouselItems}
        />

        <CardCarousel
          titleCard="Sản phẩm tương tự"
          carouselItems={carouselItems}
        />

        <DescribeProduct
          description={getProductDetailInformation.productDescription}
        />

        <EvaluateProduct />

        <Review />
      </div>
    </div>
  );
};

export default ProductDetailPage;
