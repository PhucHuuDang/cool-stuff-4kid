import Image from "next/image";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="flex items-center justify-between p-4 bg-gradient-to-r from-white to-slate-200 shadow-lg hover:shadow-xl duration-200">
      <div className="flex items-center">
        <Image
          src="/cool-stuff-for-kid.jpeg"
          alt="logo"
          height={100}
          width={100}
          className="mr-4"
        />
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
      <div className="flex items-center">
        <input 
          type="text" 
          placeholder="Search here" 
          className="px-4 py-2 border rounded-lg focus:outline-none"
        />
        <div className="ml-4 flex items-center">
          <Image 
            src="https://via.placeholder.com/40" 
            alt="User Avatar"
            width={40}
            height={40}
            className="w-10 h-10 rounded-full"
          />
          <div className="ml-2">
            <span className="block">Vũ Minh Quân</span>
            <span className="text-sm text-gray-500">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export { Header };
