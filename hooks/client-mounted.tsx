"use client";
import { useEffect, useState } from "react";

export const ClientMounted = ({ children }: { children: React.ReactNode }) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    return setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return <>{children}</>;
};
