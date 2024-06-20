import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import SideBar from "@/components/SideBar";
import { Details } from "./_component/details";

const ProductManagement = () => {
  return (
    <div className="flex min-h-screen">
      <SideBar />
      <div className="flex flex-grow flex-col">
        <Header title="ProductManagement" />
        <main className="ml-64 flex-grow overflow-auto bg-gray-100 p-3">
          <Details />
        </main>
        {/* <Footer /> */}
      </div>
    </div>
  );
};
export default ProductManagement;
