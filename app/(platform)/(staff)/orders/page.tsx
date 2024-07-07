import { Header } from "../_component/header";
import SideBar from "../_component/sidebar";
import { Details } from "./_component/details";

const Orders = () => {
  return (
    <div className="flex min-h-screen">
      <SideBar />
      <div className="flex flex-grow flex-col">
        <Header title="Orders" />
        <main className="ml-64 flex-grow overflow-auto bg-gray-100 p-3">
          <Details />
        </main>
        {/* <Footer /> */}
      </div>
    </div>
  );
};
export default Orders;
