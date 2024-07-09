import { Header } from "@/components/Header";
import SideBar from "../_component/sidebar";
import { Details } from "./_component/details";

const Orders = () => {
  return (
    <div className="">
      <div className="fixed w-full">
        <Header title="Orders" />
      </div>
      <div className="flex">
        <div>
          <SideBar />
        </div>
        <main className="ml-64 mt-[100px] h-full w-full px-2 pt-2">
          <Details />
        </main>
      </div>
    </div>
  );
};
export default Orders;
