import { Header } from "@/components/Header";
import { Details } from "./_component/details";
import SideBar from "../_component/sidebar";

const ProductManagement = () => {
  return (
    <div className="">
      <div className="fixed w-full">
        <Header title="Product Management" />
      </div>
      <div className="flex">
        <div>
          <SideBar />
        </div>
        <main className="ml-64 mt-24 h-full w-full px-2 pb-[92px]">
          <Details />
        </main>
      </div>
    </div>
  );
};
export default ProductManagement;
