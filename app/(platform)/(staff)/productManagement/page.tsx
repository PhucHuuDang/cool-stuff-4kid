import { Header } from "../_component/header";
import { Details } from "./_component/details";
import SideBar from "../_component/sidebar";

const ProductManagement = () => {
  return (
    <div className="flex min-h-screen">
      <SideBar />
      <div className="flex flex-grow flex-col">
        <Header title="Product Management" />
        <main className="ml-64 flex-grow overflow-auto bg-gray-100 p-3">
          <Details />
        </main>
      </div>
    </div>
  );
};
export default ProductManagement;
