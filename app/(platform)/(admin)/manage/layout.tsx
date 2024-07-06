import { SidebarAdmin } from "../_components/sidebar-admin";

const ManageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-14 flex-col border-r bg-background sm:flex">
        <SidebarAdmin />
      </aside>
      <div className="h-full w-full 2xl:h-screen">{children}</div>
    </div>
  );
};

export default ManageLayout;
