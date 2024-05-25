import NavbarHome from "./_components/navbar-home";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="h-full">
    <NavbarHome />

    {children}
  </div>;
};

export default HomeLayout;
