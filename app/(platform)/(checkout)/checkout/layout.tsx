const CheckoutLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full bg-[#F5F7FD]">
      {/* <DrawerCheckoutCart /> */}

      {children}
    </div>
  );
};

export default CheckoutLayout;
