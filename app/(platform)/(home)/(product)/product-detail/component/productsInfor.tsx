import { Button } from "@/components/ui/button";
import {
  ArrowRightLeft,
  ArrowRightLeftIcon,
  ShieldCheckIcon,
  StarIcon,
  TruckIcon,
} from "lucide-react";
import React from "react";

export const ProductsInfor = () => {
  return (
    <div>
      <div className="flex justify-end rounded-2xl bg-white p-10">
        <div className="items-center pr-5">
          <div className="relative h-[500px] w-[500px] border-2">
            <img
              //   src={product.image}
              alt="Product"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="items-center justify-center pl-5 text-left">
          <div className="border-b-2 pb-3">
            <h1 className="ml-2 w-[800px] text-2xl font-bold text-blue-700">
              {/* {product.name} */} Sữa con bò cười
            </h1>
            <div className="flex">
              <div className="ml-2 border-r-2 pr-5 text-xl flex">
                Rating:{" "}
                {Array(/*product.rating*/ 2)
                  .fill(<StarIcon className="text-yellow-300" />)
                  .map((star, index) => (
                    <span key={index}>{star}</span>
                  ))}
              </div>
              <div className="border-r-2 px-5 text-xl">
                Thương hiệu: Dutch Lady
              </div>
              <div className="pl-5 text-xl">Mã SP: TP-6023</div>
            </div>
          </div>
          <div className="ml-2 mt-2 flex">
            <div className="flex">
              <div className="w-36 pt-1.5 text-xl"> Giá: </div>
              <div>
                <div className="flex">
                  <p className="mr-3 text-3xl font-semibold text-orange-500 ">
                    {/* {product.price} */} 100.000đ
                  </p>
                  <div className="mb-[2.5px] place-content-end text-sm text-gray-500 line-through">
                    625.000đ
                  </div>
                </div>
                <p>Được áp dụng đến hết ngày 13/06/2024</p>
              </div>
            </div>
          </div>
          <div className="ml-2 flex pt-3">
            <div className="w-36">Tình trạng: </div>
            <div className="font-bold text-green-500">Còn hàng</div>
          </div>
          <div className="ml-2 flex pt-3">
            <div className="w-36">Vận chuyển:</div>
            <div className="font-bold">
              Miễn phí vận chuyển cho đơn hàng 249.000đ
            </div>
          </div>
          <div className="ml-2 flex pt-5">
            <div>
              <Button className="mr-10 h-[50px] w-[200px] bg-blue-500 text-sm font-semibold text-white">
                THÊM VÀO GIỎ HÀNG
              </Button>
            </div>
            <div>
              <Button className=" h-[50px] w-[200px] bg-orange-500 text-sm font-semibold text-white">
                MUA NGAY
              </Button>
            </div>
          </div>
          <div>
            <Button className=" ml-2 mt-4 h-[50px] w-[200px] bg-blue-500 text-sm font-semibold text-white flex flex-col items-center justify-center">
              <div>THANH TOÁN ONLINE</div>
              <div className="text-xs">Mua hàng đảm bảo </div>
            </Button>
          </div>
          <div className="flex justify-between">
            <div className="ml-2 flex pt-5">
              <div className="pt-1 items-center rounded-full border-2 border-gray-400 px-2 text-gray-400 justify-center">
                <TruckIcon className=" w-[50px] h-[50px]" />
              </div>
              <div className="ml-3 w-[100px] items-center pt-2 text-left text-xl">
                Giao hàng toàn quốc
              </div>
            </div>
            <div className="ml-2 flex pt-5">
              <div className="pt-1 items-center rounded-full border-2 border-gray-400 px-2  text-gray-400">
                <ArrowRightLeftIcon className=" w-[50px] h-[50px]" />
              </div>
              <div className="ml-3 w-[150px] items-center pt-2 text-left text-xl">
                Đổi hàng 15 ngày miễn phí
              </div>
            </div>
            <div className="ml-2 flex pt-5">
              <div className="pt-1  items-center rounded-full border-2 border-gray-400 px-2  text-gray-400">
                <ShieldCheckIcon className=" w-[50px] h-[50px]" />
              </div>
              <div className="ml-3 w-[150px] items-center pt-2   text-left text-xl">
                Đảm bảo hàng chính hãng
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
