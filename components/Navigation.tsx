import {
  CircleUserRound,
  MessageSquareText,
  Package,
  ShoppingCart,
  SquareGanttChart,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const Navigation = () => {
  const pathname = usePathname();

  const getLinkClass = (path: string) => {
    return pathname === path ? "bg-gray-400" : "hover:bg-gray-200";
  };
  return (
    <div>
      <aside className="fixed bottom-0 left-0 top-[100px] w-64 bg-[#FCFBF4] text-white">
        <nav className="mt-6">
          <Link
            href="/"
            className={`flex rounded-r-3xl p-4 text-black ${getLinkClass("/")}`}
          >
            <SquareGanttChart className="mr-1" />
            Dashboard
          </Link>
          <Link
            href="/productManagement"
            className={`flex rounded-r-3xl p-4 text-black ${getLinkClass("/productManagement")}`}
          >
            <Package className="mr-1" />
            Product Management
          </Link>
          <Link
            href="/orders"
            className={`flex rounded-r-3xl p-4 text-black ${getLinkClass("/orders")}`}
          >
            <ShoppingCart className="mr-1" />
            Orders
          </Link>
          <Link
            href="/feedback"
            className={`flex rounded-r-3xl p-4 text-black ${getLinkClass("/feedback")}`}
          >
            <MessageSquareText className="mr-1" />
            Feedback
          </Link>
          <Link
            href="/accounts"
            className={`flex rounded-r-3xl p-4 text-black ${getLinkClass("/accounts")}`}
          >
            <CircleUserRound className="mr-1" />
            Accounts
          </Link>
        </nav>
      </aside>
    </div>
  );
};
