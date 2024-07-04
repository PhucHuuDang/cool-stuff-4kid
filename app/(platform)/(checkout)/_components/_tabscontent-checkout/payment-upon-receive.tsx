"use client";

import { TabsContent } from "@/components/ui/tabs";

interface PaymentUponReceiveProps {
  value: string;
}

export const PaymentUponReceive = ({ value }: PaymentUponReceiveProps) => {
  return (
    <TabsContent value={value} className="my-8">
      <div className="flex items-center gap-x-10">
        <h3 className="text-lg font-bold">Thanh toán khi nhận hàng</h3>
        <h3>
          Phí thu hộ: ₫0 VNĐ. Ưu đãi về phí vận chuyển (nếu có) áp dụng cả với
          phí thu hộ.
        </h3>
      </div>
    </TabsContent>
  );
};
