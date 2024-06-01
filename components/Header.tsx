interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="flex items-center">
        <input 
          type="text" 
          placeholder="Search here" 
          className="px-4 py-2 border rounded-lg"
        />
        <div className="ml-4 flex items-center">
          <img 
            src="https://via.placeholder.com/40" 
            alt="User Avatar" 
            className="w-10 h-10 rounded-full"
          />
          <div className="ml-2">
            <span className="block">M10-Warthog</span>
            <span className="text-sm text-gray-500">Super Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
