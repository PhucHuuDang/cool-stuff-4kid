import { Header } from "../_component/Header";
import SideBar from "../_component/sidebar";
import { Details } from "./_component/details";

const Orders = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="fixed z-50 w-full">
        <Header title="Order" />
      </div>
      <div className="mt-[100px] flex flex-grow">
        <div className="fixed h-full">
          <SideBar />
        </div>
        <main className="ml-64 flex-grow p-4">
          <Details />
        </main>
      </div>
    </div>
  );
};
export default Orders;