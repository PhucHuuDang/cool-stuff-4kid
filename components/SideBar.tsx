import Link from 'next/link';
import React from 'react';
import routes from '../routes/routes';

const SideBar: React.FC = () => {
  return (
    <aside className="w-64 bg-pink-600 text-white">
      <div className="p-4 text-2xl font-bold">CucCung</div>
      <nav className="mt-6">
        <Link href={routes.dashboard} legacyBehavior>
          <a className="block p-4 hover:bg-pink-500">Dashboard</a>
        </Link>
        <Link href={routes.productManagement} legacyBehavior>
          <a className="block p-4 hover:bg-pink-500">Product Management</a>
        </Link>
        <Link href={routes.orders} legacyBehavior>
          <a className="block p-4 hover:bg-pink-500">Orders</a>
        </Link>
        <Link href={routes.staffManagement} legacyBehavior>
          <a className="block p-4 hover:bg-pink-500">Staff Management</a>
        </Link>
        <Link href={routes.revenue} legacyBehavior>
          <a className="block p-4 hover:bg-pink-500">Revenue</a>
        </Link>
        <Link href={routes.adminAccount} legacyBehavior>
          <a className="block p-4 hover:bg-pink-500">Account</a>
        </Link>
      </nav>
    </aside>
  );
}

export { SideBar };
