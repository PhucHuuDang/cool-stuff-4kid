"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { MapPin, MapPinned } from "lucide-react";
import { ElementRef, useRef, useState } from "react";

export const AddressReceiveOrder = () => {
  const [addMoreAddress, setAddMoreAddress] = useState<boolean>(false);
  const formRef = useRef<ElementRef<"form">>(null);

  const getAddress = (formData: FormData) => {
    const address = formData.get("address") as string;

    console.log({ address });
  };

  const handleSubmit = () => {
    formRef.current?.requestSubmit();
  };

  return (
    <Card className="my-4 w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-x-1">
          <MapPin className="size-6" />
          Địa Chỉ Nhận Hàng
        </CardTitle>
      </CardHeader>
      <CardContent className="rounded-lg p-5">
        <div className="flex items-center justify-between">
          <h1 className="text-base font-bold">Dang Huu Phuc (0500229934456)</h1>

          <h1 className="mx-1">|</h1>

          <div className="max-w-xl text-wrap 2xl:max-w-screen-2xl">
            S901 Vinhomes Grand Park, Nguyễn Xiển, Phường Long Bình, Thành Phố
            Thủ Đức, TP. Hồ Chí Minh
          </div>

          <div className="border border-dashed border-[#ff6347] p-1 px-2 text-[#ff6347]">
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
                <form
                  ref={formRef}
                  action={getAddress}
                  className="flex gap-x-2"
                >
                  {/* add id of the address */}
                  <Checkbox
                    id="address"
                    name="address"
                    className="size-5"
                    value="001"
                  />
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

              {!addMoreAddress && (
                <Button
                  onClick={() => setAddMoreAddress(true)}
                  className="w-52"
                  variant="book"
                >
                  <MapPinned className="mr-1 size-6" /> Thêm Địa Chỉ Mới
                </Button>
              )}
              <DialogFooter>
                {!addMoreAddress ? (
                  <>
                    <DialogClose className="w-24 rounded-lg border-[1px] border-slate-600 duration-100 hover:border-[2px] hover:border-slate-800 hover:shadow-lg">
                      Huỷ
                    </DialogClose>
                    <Button
                      onClick={handleSubmit}
                      type="submit"
                      variant="book"
                      className="ml-1"
                    >
                      Xác Nhận
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      className="border-[1px]"
                      onClick={() => setAddMoreAddress(!addMoreAddress)}
                    >
                      Trở về
                    </Button>
                    {/* Todo: add logic add address in here */}
                    <Button type="submit" variant="book" className="ml-1">
                      Thêm dịa chỉ
                    </Button>
                  </>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};
