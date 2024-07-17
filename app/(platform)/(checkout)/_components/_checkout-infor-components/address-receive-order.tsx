"use client";

import { addAddress } from "@/actions/address";
import Heading from "@/app/(platform)/_components/modal/heading";
import { FormError } from "@/components/form/form-error";
import { FormInput } from "@/components/form/form-input";
import { FormSubmit } from "@/components/form/form-submit";
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
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAction } from "@/hooks/use-action";
import { useAddress } from "@/hooks/use-address";
import {
  Address,
  UserInformationDetail,
  UserInformationDetailProps,
} from "@/interface";
import { MapPin, MapPinned } from "lucide-react";
import { ElementRef, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";

interface AddressReceiveOrderProps {
  userInformationDetail: UserInformationDetailProps;
}

export const AddressReceiveOrder = ({
  userInformationDetail,
}: AddressReceiveOrderProps) => {
  const { data: information } = userInformationDetail;
  const [addMoreAddress, setAddMoreAddress] = useState<boolean>(false);
  const [isOpenDialogAddress, setIsOpenDialogAddress] =
    useState<boolean>(false);

  const formRef = useRef<ElementRef<"form">>(null);
  const formRefChooseAddress = useRef<ElementRef<"form">>(null);
  const [selectedAddressId, setSelectedAddressId] = useState<
    string | null | EventTarget
  >(null);

  const address = useAddress();
  const { pending } = useFormStatus();

  const { address: addressValue, setAddress, removeAddress } = address;

  console.log({ information });

  // console.log({ selectedAddressId });

  const { execute, fieldErrors, error, data, isLoading } = useAction(
    addAddress,
    {
      onSuccess(data) {
        toast.success("Bạn đã thêm địa chỉ thành công");
        console.log({ data });
        setAddMoreAddress(false);
        setIsOpenDialogAddress(false);
      },

      onError(error) {
        toast.error(error);
      },
    },
  );

  const handleAddMoreAddress = (formData: FormData) => {
    const id = information.id as string;
    const addressName = formData.get("addressName") as string;
    const phone = formData.get("phone") as string;
    const street = formData.get("street") as string;
    const city = formData.get("city") as string;
    const country = "Việt Nam";

    execute({ addressName, phone, street, city, id });
    console.log({ addressName, phone, street, city, id, country });
  };

  const handleChooseAddress = (formData: FormData) => {
    const addressValues = formData.get("address-shipping") as string;
    removeAddress();
    setAddress(addressValues);
  };

  const handleSubmit = () => {
    formRef.current?.requestSubmit();
  };

  const handleChooseAddressSubmit = () => {
    formRefChooseAddress.current?.requestSubmit();
    setIsOpenDialogAddress(false);
  };

  const safeParseJSON = (jsonString: string) => {
    try {
      return JSON.parse(jsonString);
    } catch (e) {
      return null;
    }
  };

  // const handleCheckboxChange = (checked: boolean) => {
  //   // setSelectedAddressId(checked);
  //   console.log({ checked });

  //   return checked
  //     ? information.addresses.some(
  //         (item) => item.addressId === parsedAddress.addressId,
  //       )
  //     : false;
  // };

  const handleCheckboxChange = (addressId: string) => (checked: boolean) => {
    if (checked) {
      setSelectedAddressId(addressId);
    } else {
      setSelectedAddressId(null);
    }
  };

  // console.log({ userInformationDetail });
  // console.log(userInformationDetail);

  const parsedAddress: Address = safeParseJSON(addressValue ?? "") ?? {};

  console.log(parsedAddress);

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
          <h1 className="text-base font-bold">
            {information.fullName} ({information.addresses[0].phone})
          </h1>

          <h1 className="mx-1">|</h1>

          <div className="max-w-xl text-wrap 2xl:max-w-screen-2xl">
            {Object.keys(parsedAddress).length === 0 ? (
              <div
                className="cursor-pointer font-semibold text-slate-600 hover:text-slate-800"
                onClick={() => {
                  setIsOpenDialogAddress(true);
                  setAddMoreAddress(true);
                }}
              >
                Hãy thêm địa chỉ nhận hàng của bạn!
              </div>
            ) : (
              <div className="font-bold">
                {parsedAddress.addressName.concat(
                  ", ",
                  parsedAddress.street,
                  ", ",
                  parsedAddress.city,
                  ", ",
                  parsedAddress.country,
                )}
              </div>
            )}
          </div>

          <div className="border border-dashed border-[#ff6347] p-1 px-2 text-[#ff6347]">
            Mặc Định
          </div>

          <Dialog
            open={isOpenDialogAddress}
            onOpenChange={setIsOpenDialogAddress}
          >
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
                !information.addresses?.length ? (
                  <Heading
                    title="Bạn chưa có dịa chỉ nhận hàng nào?"
                    subtitle="Vui lòng thêm địa chỉ nhận hàng của bạn"
                    center
                  />
                ) : (
                  <form
                    // className="flex gap-x-2"
                    action={handleChooseAddress}
                    // key={addressId}
                    ref={formRefChooseAddress}
                    // ref={index === 2 ? formRefChooseAddress : undefined}
                  >
                    {information.addresses?.map(
                      (
                        {
                          addressId,
                          addressName,
                          city,
                          id: userId,
                          country,
                          street,
                          phone,
                        },
                        index,
                      ) => {
                        const valuesCheckbox = JSON.stringify({
                          addressId,
                          userId,
                          addressName,
                          street,
                          city,
                          phone,
                          country,
                        });

                        return (
                          <div
                            className="my-6 flex items-center gap-x-2"
                            key={addressId}
                          >
                            <Checkbox
                              id={`address-${addressId}`}
                              name="address-shipping"
                              className="size-5"
                              value={valuesCheckbox}
                              // checked={selectedAddressId === addressId}
                              defaultChecked={
                                parsedAddress.addressId === addressId
                              }
                              // checked={parsedAddress.addressId === addressId}
                              checked={selectedAddressId === addressId}
                              onCheckedChange={handleCheckboxChange(addressId)}
                              // onCheckedChange={handleCheckboxChange}
                              // onChange={(e) => setSelectedAddressId(e.target)}
                            />
                            <Label
                              htmlFor={`address-${addressId}`}
                              className="flex cursor-pointer flex-col gap-y-2"
                            >
                              <div className="flex items-center gap-1">
                                <h2 className="text-xl font-bold">
                                  {information.fullName}
                                </h2>
                                <h2>|</h2>
                                <h2 className="font-semibold text-slate-700">
                                  {phone}
                                </h2>
                              </div>
                              <p className="text-slate-500">
                                {addressName.concat(
                                  ", ",
                                  street,
                                  ", ",
                                  city,
                                  ", ",
                                  country,
                                )}
                              </p>
                            </Label>
                          </div>
                        );
                      },
                    )}
                  </form>
                )
              ) : (
                <form
                  className="px-5"
                  action={handleAddMoreAddress}
                  ref={formRef}
                >
                  <Heading
                    title="Thêm địa chỉ mới"
                    subtitle="Hãy thêm địa chỉ nhận hàng của bạn!"
                    center
                  />
                  <div className="my-4 flex flex-col gap-y-4">
                    <div>
                      <FormInput
                        label="Số Điện Thoại"
                        id="phone"
                        labelClassName="text-neutral-700"
                        placeholder="+84 2232"
                        className="h-12 w-full rounded-lg border-[1px] border-slate-600 p-2 focus:border-slate-800 focus:outline-none"
                        required
                      />
                      <FormError id="phone" errors={fieldErrors} />
                    </div>

                    <div>
                      <FormInput
                        label="Địa chỉ nhà"
                        placeholder="Vinhomes..."
                        labelClassName="text-neutral-700"
                        id="addressName"
                        className="h-12 w-full rounded-lg border-[1px] border-slate-600 p-2 focus:border-slate-800 focus:outline-none"
                        disabled={pending}
                        required
                      />
                      <FormError id="addressName" errors={fieldErrors} />
                    </div>

                    <div>
                      <FormInput
                        disabled={pending}
                        id="street"
                        label="Tên Đường"
                        placeholder="Đường số, Phường, Quận"
                        className="h-12 w-full rounded-lg border-[1px] border-slate-600 p-2 focus:border-slate-800 focus:outline-none"
                        labelClassName="text-neutral-700"
                      />
                      <FormError id="street" errors={fieldErrors} />
                    </div>

                    <div>
                      <FormInput
                        disabled={pending}
                        id="city"
                        label="Thành Phố"
                        placeholder="Hồ Chí Minh"
                        className="h-12 w-full rounded-lg border-[1px] border-slate-600 p-2 focus:border-slate-800 focus:outline-none"
                        labelClassName="text-neutral-700"
                      />
                      <FormError id="city" errors={fieldErrors} />
                    </div>
                  </div>
                </form>
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
                    <DialogClose
                      asChild
                      className="w-24 rounded-lg border-[1px] border-slate-600 duration-100 hover:border-[2px] hover:border-slate-800 hover:shadow-lg"
                    >
                      <Button variant="outline">Huỷ</Button>
                    </DialogClose>

                    {information.addresses?.length && (
                      <Button
                        type="submit"
                        variant="book"
                        className="ml-1"
                        onClick={handleChooseAddressSubmit}
                      >
                        Xác Nhận
                      </Button>
                    )}
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
                    <FormSubmit
                      disabled={pending}
                      variant="book"
                      className="ml-1"
                      onClick={handleSubmit}
                    >
                      Thêm dịa chỉ
                    </FormSubmit>
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
