import { HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { CreditCard } from "lucide-react";

interface PaymentMethodOnlineProps {
  onClick?: () => void;
  image: string;
}

export const PaymentMethodOnline = ({
  onClick,
  image,
}: PaymentMethodOnlineProps) => {
  return (
    <>
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
          <CreditCard className="size-8" /> <span>Credit card</span>
        </div>
      </HoverCardContent>
    </>
  );
};
