import { Header } from "../_component/Header";
import SideBar from "../_component/sidebar";
import { Profile } from "./_component/profile";

const Accounts = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="fixed z-50 w-full">
        <Header title="Product Management" />
      </div>
      <div className="mt-[100px] flex flex-grow">
        <div className="fixed h-full">
          <SideBar />
        </div>
        <main className="ml-64 flex-grow p-4">
          <Profile />
        </main>
      </div>
    </div>
  );
};
export default Accounts;
