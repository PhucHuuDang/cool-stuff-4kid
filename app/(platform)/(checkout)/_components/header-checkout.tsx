import { Logo } from "../../(home)/_components/logo";

export const HeaderCheckout = () => {
  return (
    <div className="h-20 w-full">
      <div className="my-5 flex items-center gap-x-2 px-20">
        {/* <Logo /> */}
        <Logo height={100} width={130} className="md:text-lg" />
        <h1 className="text-[60px] font-thin text-slate-500">|</h1>

        <h1 className="text-[40px] font-bold text-slate-700">Thanh Toán</h1>
      </div>
    </div>
  );
};
