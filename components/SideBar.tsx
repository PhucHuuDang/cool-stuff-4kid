
"use client";

import { usePathname } from 'next/navigation';

const SideBar = () => {
  const pathname = usePathname();
  
  const getLinkClass = (path: string) => {
    return pathname === path ? 'bg-pink-700' : 'hover:bg-pink-500' ;
  };

  return (
    <aside className="w-64 bg-pink-500 text-white fixed left-0 top-0 bottom-0">
      <div className="p-4 text-2xl font-bold border border-black h-[65px] bg-pink-600">CucCung</div>
      <nav className="mt-6">
        <a href="/" className={`block p-4 ${getLinkClass('/')}`}>Dashboard</a>
        <a href="/productManagement" className={`block p-4 ${getLinkClass('/productManagement')}`}>Product Management</a>
        <a href="/orders" className={`block p-4 ${getLinkClass('/orders')}`}>Orders</a>
        <a href="/feedback" className={`block p-4 ${getLinkClass('/feedback')}`}>Feedback</a>
        <a href="/accounts" className={`block p-4 ${getLinkClass('/accounts')}`}>Accounts</a>
      </nav>
    </aside>
  );
}

export default SideBar;