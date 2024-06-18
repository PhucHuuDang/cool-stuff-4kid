import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import { Profile } from "./component/profile";

const Accounts = () => {
  return (
    <div className="flex min-h-screen">
      <SideBar />
      <div className="flex flex-col flex-grow">
        <Header title="Accounts" />
        <main className="flex-grow bg-gray-100 p-6 pb-20 overflow-auto mt-16 ml-64">
          <Profile />
        </main>
        {/* <Footer /> */}
      </div>
    </div>
  );
};
export default Accounts;
