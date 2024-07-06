"use client";

import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Home,
  LineChart,
  Package,
  Package2,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react";
import React, { useState } from "react";
import { NavItemAdmin } from "./nav-item";

export const SidebarAdmin = () => {
  const [active, setActive] = useState<string>("");

  const Navbar_items = [
    {
      label: "Dashboard",
      href: "/",
      icon: (
        <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
      ),
    },
    {
      label: "Dashboard",
      href: "/",
      icon: <Home className="h-5 w-5" />,
    },
    {
      label: "Orders",
      href: "/manage/orders",
      icon: <ShoppingCart className="h-5 w-5" />,
    },
    {
      label: "Products",
      href: "/manage/products",
      icon: <Package className="h-5 w-5" />,
    },
    {
      label: "Customers",
      href: "#",
      icon: <Users2 className="h-5 w-5" />,
    },
    {
      label: "Analytics",
      href: "#",
      icon: <LineChart className="h-5 w-5" />,
    },
  ];

  return (
    <>
      <nav className="z-50 flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href="/"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">Dashboard</span>
        </Link>
        {Navbar_items.map((navbar) => {
          return (
            <NavItemAdmin
              key={navbar.href}
              href={navbar.href}
              label={navbar.label}
              icon={navbar.icon}
              onSelected={() => setActive(navbar.label)}
              selected={active === navbar.label}
            />
          );
        })}
      </nav>
      <nav
        className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5"
        onClick={() => console.log("settings")}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Settings</TooltipContent>
        </Tooltip>
      </nav>
    </>
  );
};
