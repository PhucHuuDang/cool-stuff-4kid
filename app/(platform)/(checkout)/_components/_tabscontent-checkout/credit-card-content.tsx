"use client";

import { TabsContent } from "@/components/ui/tabs";
import { PaymentMethodOnline } from "../_checkout-infor-components/payments-online";

interface CreditContentProps {
  value: string;
}

export const CreditCardContent = ({ value }: CreditContentProps) => {
  return (
    <TabsContent value={value}>
      <div className="flex items-center gap-4 px-10 py-5">
        <PaymentMethodOnline image="/images/credit-card.jpg" />
        <PaymentMethodOnline
          image="/images/credit-card.jpg"
          hoverCardContent="Zalo Pay"
        />
      </div>
    </TabsContent>
  );
};
