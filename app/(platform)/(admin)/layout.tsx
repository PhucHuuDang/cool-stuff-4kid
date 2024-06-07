import { TooltipProvider } from "@/components/ui/tooltip";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <TooltipProvider>
      <div className="h-full">{children}</div>
    </TooltipProvider>
  );
};

export default AdminLayout;
