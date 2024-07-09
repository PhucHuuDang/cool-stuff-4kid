'use client'
import { informationDecoded } from "@/app/auth/information-decoded";
import { Header } from "@/components/Header";
import { SideBar } from "@/components/Sidebar";
import React, { useEffect, useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  const [decodedInfo, setDecodedInfo] = useState<any>(null);

  useEffect(() => {
    const fetchDecodedInfo = async () => {
      try {
        const info = await informationDecoded();
        setDecodedInfo(info);
        console.log("User information fetched:", info);
      } catch (error) {
        console.error("Error fetching decoded information:", error);
      }
    };

    fetchDecodedInfo();
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <div className="sticky top-0 z-50 bg-white">
        <Header title={title} />
      </div>
      <div className="flex flex-grow">
        <div className="w-64 bg-slate-500/10">
          <div className="fixed h-screen mt-6 w-64">
            <SideBar decodedInfo={decodedInfo} />
          </div>
        </div>
        <main className="flex-grow p-6 bg-slate-500/10 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;