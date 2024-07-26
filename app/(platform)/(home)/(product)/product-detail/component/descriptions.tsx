import React from "react";

export const Descriptions = () => {
  return (
    <div>
      <div className="ml-72 mt-5 min-h-[150px] w-[900px] justify-center rounded-2xl bg-white">
        <div className="ml-2 flex items-center py-3 text-2xl">
          <p className=" ml-2 mr-10 font-bold">Mô tả sản phẩm</p>
        </div>

        <div className="mx-2 bg-white text-lg">
          <div className="ml-2">
            {/* <p>{product.description}</p> */} Rất ngon và mlem
          </div>
        </div>
      </div>
      <div className="ml-72 mt-5 h-[290px] w-[900px] justify-center rounded-2xl bg-white">
        <div className="items-center justify-center justify-items-center rounded-full py-3 text-2xl font-bold">
          <div className="ml-3 text-blue-500">Thông số sản phẩm</div>
        </div>
        <div className="ml-3 mt-5">
          <div className="mb-5 mr-2 flex rounded-full bg-blue-200 py-2 text-xl">
            <div className="ml-2 w-[400px] font-semibold">Xuất xứ</div>
            <div>Thái Lan</div>
          </div>
          <div className="mb-5 flex text-xl">
            <div className="ml-2 w-[400px] font-semibold">Dung tích</div>
            <div>600ml</div>
          </div>
          <div className="mb-5 mr-2 flex rounded-full bg-blue-200 py-2 text-xl">
            <div className="ml-2 w-[400px] font-semibold">
              Kích thước (bao bì)
            </div>
            <div>14.5x5x21.7cm</div>
          </div>
          <div className="flex text-xl">
            <div className="ml-2 w-[400px] font-semibold">Bán chạy nhất</div>
            <div>1848</div>
          </div>
        </div>
      </div>
    </div>
  );
};
