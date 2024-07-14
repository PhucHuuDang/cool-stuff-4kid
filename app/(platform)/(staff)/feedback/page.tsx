import { Header } from "../_component/Header";
import { Details } from "./_component/details";
import SideBar from "../_component/sidebar";

const Feedback = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="fixed z-50 w-full">
        <Header title="Feedback " />
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

export default Feedback;
