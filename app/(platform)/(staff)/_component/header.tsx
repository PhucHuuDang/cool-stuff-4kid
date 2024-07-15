import Image from "next/image";
import Link from "next/link";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="flex items-center justify-between bg-gradient-to-r from-white to-slate-200 p-4 shadow-lg duration-200 hover:shadow-xl">
      <div className="flex items-center">
        <Link href="/dashboard">
          <Image
            src="/cool-stuff-for-kid.jpeg"
            alt="logo"
            height={100}
            width={100}
            className="mr-4"
          />
        </Link>
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search here"
          className="rounded-lg border px-4 py-2 focus:outline-none"
        />
        <div className="ml-4 flex items-center">
          <Image
            src="https://via.placeholder.com/40"
            alt="User Avatar"
            width={40}
            height={40}
            className="h-10 w-10 rounded-full"
          />
          <div className="ml-2">
            <span className="block">M10-Warthog</span>
            <span className="text-sm text-gray-500">Staff</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export { Header };
