"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface FormSubmitProps {
  disabled?: boolean;
  children: React.ReactNode;

  className?: string;
  variant?:
    | "secondary"
    | "outline"
    | "destructive"
    | "ghost"
    | "link"
    | "default";
}

export const FormSubmit = ({
  children,
  variant = "default",
  disabled,
  className,
}: FormSubmitProps) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={disabled || pending}
      variant={variant}
      className={cn(className)}
    >
      {children}
    </Button>
  );
};
