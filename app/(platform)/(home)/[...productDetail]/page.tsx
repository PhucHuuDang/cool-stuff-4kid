import { DataProducts, carouselItems } from "@/db";
import { CardCarousel } from "@/components/card-carousel";
import { ProductInformationDetail } from "../_components/product-infomation-detail";
import { DescribeProduct } from "../_components/describe-product";
import { EvaluateProduct } from "../_components/evaluate-product";
import { Review } from "../_components/review";
import { removeMarks } from "@/handle-transform/remove-marks";
import {
  CardCarouselPropsPicked,
  Product,
  ProductApiProps,
  ProductDetailProps,
} from "@/interface";
import { getData } from "@/get-data-actions/get-data";
import { getProducts } from "@/get-data-actions/get-products";

const ProductDetailPage = async ({
  params,
}: {
  params: { productDetail: string };
}) => {
  const { productDetail } = params;

  // console.log({ productDetail });

  const idProduct = Number(productDetail.slice(1).toString());

  const getProductDetailInformation: ProductDetailProps = await getData(
    `/Product/GetProductsById/${idProduct}`,
  );
  const productsCarousel: CardCarouselPropsPicked[] = await getProducts();

  // console.log({ productsCarousel });

  return (
    <div className="2xl:max-w-screen pt-20">
      <div className="space-y-8 px-20 py-10">
        <ProductInformationDetail productDetail={getProductDetailInformation} />

        <CardCarousel
          titleCard="Thường được mua cùng"
          carouselItems={productsCarousel}
        />

        <CardCarousel
          titleCard="Sản phẩm tương tự"
          carouselItems={productsCarousel}
        />

        <DescribeProduct
          description={getProductDetailInformation.productDescription}
        />

        <EvaluateProduct />

        <Review productDetail={getProductDetailInformation} />
      </div>
    </div>
  );
};

export default ProductDetailPage;
