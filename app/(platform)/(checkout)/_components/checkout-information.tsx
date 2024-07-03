"use client";

import { FormInput } from "@/components/form/form-input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCartStore } from "@/hooks/use-cart-store";
import useFromStore from "@/store/use-from-store";
import { CreditCard, MapPin } from "lucide-react";
import Image from "next/image";
import { ProductCheckout } from "./_checkout-infor-components/product-checkout";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { formatCurrency } from "@/handle-transform/formatCurrency";
import { PaymentMethodOnline } from "./_checkout-infor-components/payments-online";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { AddressReceiveOrder } from "./_checkout-infor-components/address-receive-order";
import { CreditCardContent } from "./_tabscontent-checkout/credit-card-content";
import { PaymentUponReceive } from "./_tabscontent-checkout/payment-upon-receive";
import { vouchers } from "@/db";

const tabsProps = [
  {
    value: "payment-upon-receipt",
    label: "Thanh toán khi nhận hàng",
  },
  {
    value: "credit-card",
    label: "Thẻ tín dụng/Ghi nợ",
  },
];

export const CheckoutInformation = () => {
  const cart = useFromStore(useCartStore, (state) => state.cart);

  let total = 0;

  if (cart) {
    total = cart.reduce(
      (acc, product) =>
        acc + product.discountPrice * (product.quantityOrder as number),
      0,
    );
  }

  const currencyTransformed = formatCurrency(total);

  const handleMessage = (formData: FormData) => {
    const message = formData.get("message") as string;

    console.log({ message });
  };

  return (
    <div className="px-10 pb-20">
      <AddressReceiveOrder />

      <Card className="my-4">
        <CardContent className="rounded-lg p-5">
          <Table>
            <TableCaption className="flex items-center justify-between">
              {/* test */}
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-[#020918]">
                  <CardTitle>Sản Phẩm</CardTitle>
                </TableHead>
                <TableHead>Đơn giá</TableHead>
                <TableHead>Số lượng</TableHead>
                <TableHead>Thành tiền</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cart?.map((product) => (
                <ProductCheckout key={product.id} product={product} />
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Voucher của shop</TableCell>
                <TableCell className="text-right">
                  {/* Todo: dialog to choose voucher in onClick button */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="book">Chọn Voucher</Button>
                    </DialogTrigger>
                    <DialogContent className="h-[70%] overflow-y-auto">
                      {/* <div className="flex gap-x-3"> */}
                      <div>
                        {vouchers.map((voucher) => {
                          return (
                            <div
                              key={voucher.product}
                              className="relative my-2 w-full cursor-pointer p-8 shadow-xl"
                            >
                              <h2 className="text-lg font-bold text-[#ff6347]">
                                Giảm {formatCurrency(voucher.price)}
                              </h2>

                              <h4 className="text-base font-semibold">
                                {voucher.condition}
                              </h4>
                              <p className="text-base font-medium">
                                {voucher.product}
                              </p>
                              <p className="font-sm font-normal">
                                {voucher.additionalInfo}
                              </p>
                              <Button
                                variant="book"
                                className="absolute right-3 top-1/2 flex justify-end"
                              >
                                Lưu
                              </Button>
                            </div>
                          );
                        })}
                      </div>
                      {/* </div> */}
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>

          <Separator />

          <div className="flex">
            <div className="flex w-[40%] flex-1 items-center gap-x-1">
              <h3 className="w-20 flex-1">Lời nhắn: </h3>
              <form action={handleMessage}>
                <FormInput
                  id="message"
                  placeholder="Lưu ý cho admin shop"
                  disabled={false}
                  className="h-12 w-[400px]"
                  labelClassName="text-neutral-700"
                />
              </form>
            </div>

            <Table className="w-full flex-1">
              <TableHeader>
                <TableRow>
                  <TableHead>Đơn vị vận chuyển:</TableHead>
                  <TableHead>Nhanh</TableHead>
                  <TableHead>
                    <Dialog>
                      <DialogTrigger>
                        <Button variant="outline">Thay Đổi</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <div className="flex flex-col gap-4">
                          <div>Nhanh</div>
                          <div>Tiét Kiệm</div>
                          <div>Hoả Tốc</div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableHead>
                  <TableHead className="text-[#ff6347]">81.000</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="w-full hover:bg-transparent">
                <TableRow className="w-full hover:bg-transparent">
                  <TableCell colSpan={1}></TableCell>
                  <TableCell className="flex items-center gap-x-1 text-sm text-[#36ae9d]">
                    <Image
                      height={20}
                      width={20}
                      alt="express-delivery"
                      src="/images/express-delivery.svg"
                    />
                    Đảm bảo nhận hàng từ 30 Tháng 6 - 1 Tháng 7
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <CardFooter className="text-right">
            {/* Todo: Render number of product */}
            <div className="flex items-center gap-x-5">
              <h2>Tổng số tiền ({cart?.length} sản phẩm): </h2>
              <h2 className="font-bold text-[#ff6347]">
                {currencyTransformed}
              </h2>
            </div>
          </CardFooter>
        </CardContent>
      </Card>

      <Card className="my-5">
        <CardHeader>
          <CardTitle>Phương thức thanh toán</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs className="w-full" defaultValue="payment-upon-receipt">
            <TabsList className="w-full space-x-1">
              {tabsProps.map((tab) => (
                <TabsTrigger
                  className="w-52 border border-slate-600 data-[state=active]:bg-sky-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
                  key={tab.value}
                  value={tab.value}
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <PaymentUponReceive value="payment-upon-receipt" />
            <CreditCardContent value="credit-card" />
          </Tabs>

          <CardFooter className="flex justify-end">
            <div className="flex flex-col space-y-4 rounded-lg p-4 duration-200 hover:shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium">Tổng số tiền:</span>
                <span className="text-lg font-medium">
                  {currencyTransformed}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium">Phí vận chuyển:</span>
                <span className="rounded-md px-2 py-1 text-right text-lg font-medium">
                  15.000
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium">
                  Tổng cộng voucer giảm giá:
                </span>
                <span className="rounded-md px-2 py-1 text-right text-lg font-medium">
                  -3.500
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium">Tổng thanh toán:</span>
                <h1 className="text-2xl font-bold text-[#ff6347]">
                  {currencyTransformed}
                </h1>
              </div>
            </div>
          </CardFooter>

          <CardFooter className="flex items-center justify-between">
            <div>
              Để đảm bảo đơn hàng của bạn, bạn hãy kiểm tra lại đơn hàng của
              mình trước khi Đặt Hàng
            </div>
            <Button className="w-64 text-right" variant="book">
              Đặt hàng
            </Button>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
};
