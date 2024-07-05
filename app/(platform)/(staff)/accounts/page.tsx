import { Header } from "../_component/header";
import SideBar from "@/components/SideBar";
import { Profile } from "./_component/profile";

const Accounts = () => {
  return (
    <div className="flex min-h-screen">
      <SideBar />
      <div className="flex flex-grow flex-col">
        <Header title="Accounts" />
        <main className="ml-64 flex-grow overflow-auto bg-gray-100 pb-20">
          <Profile />
        </main>
      </div>
    </div>
  );
};
export default Accounts;
