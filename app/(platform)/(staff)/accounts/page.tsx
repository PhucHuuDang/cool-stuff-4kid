import { Header } from "@/components/Header";
import SideBar from "../_component/sidebar";

import { Profile } from "./_component/profile";

const Accounts = () => {
  return (
    <div className="">
      <div className="fixed w-full">
        <Header title="Accounts" />
      </div>
      <div className="flex">
        <div>
          <SideBar />
        </div>
        <main className="ml-64 mt-[100px] h-full w-full px-2 pb-[92px]">
          <Profile />
        </main>
      </div>
    </div>
  );
};
export default Accounts;
