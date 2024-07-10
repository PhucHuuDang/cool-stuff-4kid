import { LoaderCircle } from "lucide-react";

export const Loading = () => {
  return (
    <div className="absolute inset-0 flex h-full w-full items-center justify-center bg-neutral-200/50">
      <div className="flex flex-col items-center justify-center">
        <LoaderCircle className="size-5 animate-spin" />
        <p className="mt-4 text-lg font-bold">Loading...</p>
      </div>
    </div>
  );
};
