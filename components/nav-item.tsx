"use client";

import { ArrowRight } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface NavProps {
  label: string;
  href?: string;
  childNode?: NavProps[];
}

export const NavItem = ({ label, href, childNode }: NavProps) => {
  return (
    <>
      <HoverCardTrigger asChild>
        <div className="group/nav flex h-9 cursor-pointer items-center justify-between bg-slate-700/10 px-4 transition duration-200 hover:rounded-sm hover:bg-slate-300">
          {label}{" "}
          <ArrowRight className="text-slate-400 duration-300 group-hover/nav:scale-x-150" />
        </div>
      </HoverCardTrigger>
      <HoverCardContent
        side="right"
        className="z-50 w-[500px] *:flex *:h-10 *:items-center"
      >
        <h1 className="my-4 font-bold">{label}</h1>
        {childNode?.map((item) => <div key={item.href}>{item.label}</div>)}
      </HoverCardContent>
    </>
  );
};
