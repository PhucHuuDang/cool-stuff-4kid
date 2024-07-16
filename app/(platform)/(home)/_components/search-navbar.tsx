"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchNavbarProps {
  type?: string;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  searchIcon?: React.ReactNode;
  defaultValue?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchNavbar = ({
  type,
  disabled,
  placeholder,
  className,
  searchIcon,
  defaultValue = "",
  value,
  onChange
}: SearchNavbarProps) => {
  

  return (
    <div className="space-y-2">
      <div className="space-y-1">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
            {searchIcon}
          </div>
          <Input
            type={type}
            placeholder={placeholder}
            defaultValue={defaultValue}
            className={cn("h-7 w-full py-1 pl-8 text-sm", className)}
            style={{ paddingLeft: searchIcon ? "3rem" : "1rem" }}
            value={value}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
};
