"use client";
import { Loading } from "@/app/(platform)/(home)/_components/loading";
import { useEffect, useState } from "react";

export const ClientMounted = ({ children }: { children: React.ReactNode }) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    return setIsMounted(true);
  }, []);

  if (!isMounted) return <Loading />;

  return <>{children}</>;
};
