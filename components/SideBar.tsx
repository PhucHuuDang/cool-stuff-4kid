
"use client";

import Link from 'next/link';
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
        <Link href="/" className={`block p-4 ${getLinkClass('/')}`}>Dashboard</Link>
        <Link href="/productManagement" className={`block p-4 ${getLinkClass('/productManagement')}`}>Product Management</Link>
        <Link href="/orders" className={`block p-4 ${getLinkClass('/orders')}`}>Orders</Link>
        <Link href="/feedback" className={`block p-4 ${getLinkClass('/feedback')}`}>Feedback</Link>
        <Link href="/accounts" className={`block p-4 ${getLinkClass('/accounts')}`}>Accounts</Link>
      </nav>
    </aside>
  );
}

export default SideBar;