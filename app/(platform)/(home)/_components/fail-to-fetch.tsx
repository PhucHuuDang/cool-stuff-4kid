import { BugOff } from "lucide-react";

export const FailedToFetch = ({ route }: { route: string }) => {
  return (
    <div className="absolute flex h-full w-full items-center justify-center bg-neutral-200/50">
      <div className="flex flex-col items-center justify-center">
        <BugOff className="size-10 animate-pulse lg:size-20" />
        <p className="mt-4 text-lg font-bold">
          Something went wrong with the "{route}"...
        </p>
      </div>
    </div>
  );
};
