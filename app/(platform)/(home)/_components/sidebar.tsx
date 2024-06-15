import { NavItem } from "@/components/nav-item";
import { HoverCard, HoverCardContent } from "@/components/ui/hover-card";

const NAV_ITEMS = [
  {
    label: "Milk",
    href: "/milk",
    children: [
      {
        label: "Vina Milk",
        href: "/milk",
      },
      {
        label: "Japan Milk",
        href: "/milk",
      },
    ],
  },
  {
    label: "Cheese",
    href: "/cheese",
    children: [
      {
        label: "Cheese 1",
        href: "/cheese",
      },
      {
        label: "Cheese 2",
        href: "/cheese",
      },
    ],
  },
  {
    label: "Toys",
    href: "/toys",
    children: [
      {
        label: "Toys 1",
        href: "/toys",
      },
      {
        label: "Toys 2",
        href: "/toys",
      },
    ],
  },
];

const Sidebar = () => {
  return (
    <div className="w-64">
      <div className="fixed z-50 h-full w-64 rounded-lg bg-slate-500/10 2xl:h-screen">
        {NAV_ITEMS.map((item) => (
          <HoverCard openDelay={0} closeDelay={100} key={item.href}>
            <NavItem
              key={item.href}
              label={item.label}
              childNode={item?.children}
            />
          </HoverCard>
        ))}
        {/* {renderNavItems(NAV_ITEMS)} */}
      </div>
    </div>
  );
};

export default Sidebar;
