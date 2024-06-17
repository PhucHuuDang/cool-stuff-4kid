import Sidebar from "../../_components/sidebar";
import { Comment } from "./component/comment";
import { Descriptions } from "./component/descriptions";
import { ProductsInfor } from "./component/productsInfor";

const ProductPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="pt-20 bg-gray-200">
      <ProductsInfor />
      <Descriptions />
      <Comment />
    </div>
  );
};

export default ProductPage;
