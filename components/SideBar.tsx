const SideBar = () => {
  return (
    <aside className="w-64 bg-pink-600 text-white">
      <div className="p-4 text-2xl font-bold">CucCung</div>
      <nav className="mt-6">
        <a href="/" className="block p-4 hover:bg-pink-500">Dashboard</a>
        <a href="/ProductManagement" className="block p-4 hover:bg-pink-500">Product Management</a>
        <a href="/Orders" className="block p-4 hover:bg-pink-500">Orders</a>
        <a href="/StaffManagement" className="block p-4 hover:bg-pink-500">Staff Management</a>
        <a href="/Revenue" className="block p-4 hover:bg-pink-500">Revenue</a>
        <a href="/Accounts" className="block p-4 hover:bg-pink-500">Accounts</a>
      </nav>
    </aside>
  );
}

export { SideBar };
