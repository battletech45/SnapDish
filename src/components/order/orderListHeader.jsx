import React from "react";

const OrderListHeader = () => {
  return (
    <div className="flex justify-between items-center pb-8 border-b border-[#393C49]">
      <p className="font-barlow text-lg font-semibold leading-6 text-white">Item</p>
      <div className="flex items-center gap-11">
        <p className="font-barlow text-lg font-semibold leading-6 text-white">Qty</p>
        <p className="font-barlow text-lg font-semibold leading-6 text-white">Price</p>
      </div>
    </div>
  );
};

export default OrderListHeader;
