"use client";

import { ElementType, forwardRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import { IconType } from "react-icons";

interface FormInputProps {
  type?: string;
  disabled?: boolean;
  placeholder?: string;
  id: string;
  required?: boolean;
  className?: string;
  icon?: IconType;
  error?: Record<string, string[]> | undefined;
  searchIcon?: React.ReactNode;
  defaultValue?: string;
  label?: string;
  labelClassName?: string;
  iconClassName?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      type,
      disabled,
      placeholder,
      id,
      required,
      className,
      searchIcon,
      error,
      icon: Icon,
      defaultValue = "",
      label,
      labelClassName,
      iconClassName,
    },
    ref,
  ) => {
    const { pending } = useFormStatus();

    return (
      <div className="space-y-2">
        <div className="space-y-1">
          {label ? (
            <Label
              className={cn(
                "text-lg font-semibold text-neutral-200",
                labelClassName,
              )}
              htmlFor={id}
            >
              {label}
            </Label>
          ) : null}
          {Icon ? (
            <div className="relative">
              <div
                className={cn(
                  "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2",
                  iconClassName,
                )}
              >
                <Icon />
              </div>
              <Input
                ref={ref}
                type={type}
                required={required}
                disabled={disabled || pending}
                placeholder={placeholder}
                id={id}
                name={id}
                defaultValue={defaultValue}
                className={cn("h-7 w-full py-1 pl-8 text-sm", className)}
                aria-describedby={`${id}-error`}
                style={{ paddingLeft: <Icon /> ? "2.5rem" : "1rem" }}
              />
            </div>
          ) : searchIcon ? (
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                {searchIcon}
              </div>
              <Input
                ref={ref}
                type={type}
                required={required}
                disabled={disabled || pending}
                placeholder={placeholder}
                id={id}
                name={id}
                defaultValue={defaultValue}
                className={cn("h-7 w-full py-1 pl-8 text-sm", className)}
                aria-describedby={`${id}-error`}
                style={{ paddingLeft: searchIcon ? "3rem" : "1rem" }}
              />
            </div>
          ) : (
            <Input
              ref={ref}
              type={type}
              required={required}
              disabled={disabled || pending}
              placeholder={placeholder}
              id={id}
              name={id}
              defaultValue={defaultValue}
              className={cn("h-7 w-full py-1 pl-4 text-sm", className)}
              aria-describedby={`${id}-error`}
            />
          )}
        </div>
      </div>
    );
  },
);

FormInput.displayName = "FormInput";
