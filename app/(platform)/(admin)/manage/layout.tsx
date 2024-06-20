import { SidebarAdmin } from "../_components/sidebar-admin";

const MangeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <SidebarAdmin />
      </aside>
      {children}
    </div>
  );
};

export default MangeLayout;
