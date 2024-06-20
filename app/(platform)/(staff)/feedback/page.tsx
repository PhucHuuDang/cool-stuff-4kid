import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import SideBar from "@/components/SideBar";
import { Details } from "./_component/details";

const Feedback = () => {
  return (
    <div className="flex min-h-screen overflow-hidden">
      <SideBar />
      <div className="flex flex-grow flex-col">
        <Header title="Feedback" />
        <main className="ml-64 flex-grow overflow-auto bg-gray-100 p-3">
          <Details />
        </main>
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default Feedback;
