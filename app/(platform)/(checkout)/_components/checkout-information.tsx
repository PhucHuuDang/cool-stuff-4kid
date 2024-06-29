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
  const [addMoreAddress, setAddMoreAddress] = useState<boolean>(false);

  let total = 0;

  if (cart) {
    total = cart.reduce(
      (acc, product) =>
        acc + product.discountPrice * (product.quantity as number),
      0,
    );
  }

  const currencyTransformed = formatCurrency(total);

  return (
    <div className="px-10 pb-20">
      <Card className="my-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-x-1">
            <MapPin className="size-6" />
            Địa Chỉ Nhận Hàng
          </CardTitle>
        </CardHeader>
        <CardContent className="rounded-lg p-5">
          <div className="flex items-center justify-between">
            <div>Dang Huu Phuc (0500229934456)</div>

            <div>
              S901 Vinhomes Grand Park, Nguyễn Xiển, Phường Long Bình, Thành Phố
              Thủ Đức, TP. Hồ Chí Minh
            </div>

            <div className="border border-[#ff6347] p-2 px-4 text-[#ff6347]">
              Mặc Định
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="border-[2px] transition duration-150 hover:underline hover:shadow-lg"
                >
                  Thay Đổi
                </Button>
              </DialogTrigger>
              <DialogContent>
                {!addMoreAddress ? (
                  <form action={() => {}} className="flex gap-x-2">
                    <Checkbox id="address" className="size-5" />
                    <label
                      htmlFor="address"
                      className="flex cursor-pointer flex-col gap-y-2"
                    >
                      <div className="flex items-center gap-1">
                        <h2 className="text-xl font-bold">Dang Huu Phuc</h2>
                        <h2>|</h2>
                        <h2 className="font-semibold text-slate-700">
                          0500229934456
                        </h2>
                      </div>
                      <p className="text-slate-500">
                        S901 Vinhomes Grand Park, Nguyễn Xiển, Phường Long Bình,
                        Thành Phố Thủ Đức, TP. Hồ Chí Minh
                      </p>
                    </label>
                  </form>
                ) : (
                  <div className="px-10">Add more address</div>
                )}

                {!addMoreAddress ? (
                  <Button
                    onClick={() => setAddMoreAddress(true)}
                    variant="book"
                  >
                    Them dia chi moi
                  </Button>
                ) : (
                  <Button
                    onClick={() => setAddMoreAddress(false)}
                    variant="book"
                  >
                    Back
                  </Button>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

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
                  <Button variant="book">Chọn Voucher</Button>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>

          <Separator />

          <div className="flex">
            <div className="flex w-[40%] flex-1 items-center gap-x-1">
              <h3 className="w-20 flex-1">Loi nhan: </h3>
              <form action={() => {}}>
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
                  <TableHead>Hàng Cồng Kềnh</TableHead>
                  <TableHead>
                    <Button variant="outline">Thay Đổi</Button>
                  </TableHead>
                  <TableHead>81.000</TableHead>
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
              <h2>Tổng số tiền (1 sản phẩm): </h2>
              <h2 className="font-bold text-[#ff6347]">177.000d</h2>
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
            <TabsList className="w-full space-x-2">
              {tabsProps.map((tab) => (
                <TabsTrigger
                  className="w-52 border border-slate-600 data-[state=active]:bg-sky-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
                  key={tab.value}
                  value={tab.value}
                >
                  {tab.label}
                </TabsTrigger>
              ))}
              {/* <TabsTrigger value="payment-upon-receipt"></TabsTrigger> */}
              {/* <TabsTrigger value="credit-card"></TabsTrigger> */}
            </TabsList>
            <TabsContent value="payment-upon-receipt" className="my-8">
              <div className="flex items-center gap-x-10">
                <h3>Thanh toán khi nhận hàng</h3>
                <h3>
                  Phí thu hộ: ₫0 VNĐ. Ưu đãi về phí vận chuyển (nếu có) áp dụng
                  cả với phí thu hộ.
                </h3>
              </div>
            </TabsContent>
            <TabsContent value="credit-card">
              <div className="px-10 pt-5">
                <HoverCard openDelay={200}>
                  <HoverCardTrigger asChild>
                    <div
                      style={{
                        backgroundImage: "url(/images/credit-card.jpg)",
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
                  <PaymentMethodOnline image="/images/credit-card.jpg" />
                </HoverCard>
              </div>
            </TabsContent>
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
              Để đảm bảo, bạn hãy kiểm tra lại đơn hàng của mình trước khi Đặt
              Hàng
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
