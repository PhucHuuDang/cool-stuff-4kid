// Layout.tsx
import React from "react";
import { Header } from "@/components/Header";
import { SideBar } from "@/components/Sidebar";

const Layout: React.FC<{ children: React.ReactNode; title: string }> = ({
  children,
  title,
}) => {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="sticky top-0 z-50 bg-white shadow-md">
        <Header title={title} />
      </div>
      <div className="flex flex-grow">
        <div className="w-64 bg-slate-500/10">
          <div className="fixed h-screen mt-6">
            <SideBar />
          </div>
        </div>
        <main className="flex-grow p-6 bg-gray-100 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
