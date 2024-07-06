"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";

interface NavItemAdminProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  selected: boolean;
  onSelected: () => void;
}
export const NavItemAdmin = ({
  href,
  selected,
  icon,
  label,
  onSelected,
}: NavItemAdminProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          onClick={onSelected}
          href={href}
          className={`flex h-9 w-9 items-center justify-center rounded-lg ${selected && "bg-slate-400/50"} text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8`}
        >
          {/* <ShoppingCart className="h-5 w-5" /> */}
          {icon}

          <span className="sr-only">{label}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">{label}</TooltipContent>
    </Tooltip>
  );
};
