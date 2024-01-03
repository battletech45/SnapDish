import React from "react";

const OrderListHeader = () => {
  return (
    <div className="flex justify-between items-center pb-8 px-6 border-b bg-[#1F1D2B] border-[#393C49] fixed right-0 w-1/3">
      <p className="font-barlow text-lg font-semibold leading-6 text-white">Item</p>
      <div className="flex items-center gap-11">
        <p className="font-barlow text-lg font-semibold leading-6 text-white">Qty</p>
        <p className="font-barlow text-lg font-semibold leading-6 text-white">Price</p>
      </div>
    </div>
  );
};

export default OrderListHeader;
