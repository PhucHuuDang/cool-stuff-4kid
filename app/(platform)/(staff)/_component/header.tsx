import Image from "next/image";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="flex items-center justify-between border-2 bg-[#FCFBF4] p-4 shadow-md">
      <div className="flex items-center">
        <div className="ml-10">
          <Image
            src="/cool-stuff-for-kid.jpeg"
            alt="logo"
            height={100}
            width={100}
            className=""
          />
        </div>
        <h1 className="ml-24 text-2xl font-bold">{title}</h1>
      </div>
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search here"
          className="rounded-lg border px-4 py-2"
        />
        <div className="ml-4 flex items-center">
          <Image
            src="https://via.placeholder.com/40"
            alt="User Avatar"
            width={300}
            height={300}
            className="h-10 w-10 rounded-full"
          />
          <div className="ml-2">
            <span className="block">M10-Warthog</span>
            <span className="text-sm text-gray-500">Super Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export { Header };
