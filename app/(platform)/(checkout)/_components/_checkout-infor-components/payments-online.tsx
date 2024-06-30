import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { CreditCard } from "lucide-react";

interface PaymentMethodOnlineProps {
  onClick?: () => void;

  // TODO: Add type for HoverCardContent
  hoverCardContent?: string;

  // TODO: Add icon for HoverCardTrigger
  Icon?: React.ReactNode;

  image: string;
}

export const PaymentMethodOnline = ({
  onClick,
  image,
  hoverCardContent,
  Icon,
}: PaymentMethodOnlineProps) => {
  return (
    <HoverCard openDelay={200} closeDelay={100}>
      <HoverCardTrigger asChild>
        <div
          onClick={onClick}
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: "100px",
            width: "100px",
            borderRadius: "10px",
          }}
          className="relative rounded-lg selection:cursor-pointer"
        >
          <div className="absolute size-full cursor-pointer rounded-lg duration-200 hover:bg-slate-500/20" />
        </div>
      </HoverCardTrigger>
      <HoverCardContent side="top" sideOffset={10} align="center">
        <div className="flex items-center gap-x-2">
          <CreditCard className="size-8" />{" "}
          <span>{hoverCardContent ?? "Stripe"}</span>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
