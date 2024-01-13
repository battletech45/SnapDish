import React, { useState } from "react";

import OrderList from "./orderList";
import OrderCheckout from "./orderCheckout";
import OrderHeader from "./orderHeader";

const Order = () => {
  
  return (
    <div className="hidden xl:flex flex-col w-1/3 bg-[#1F1D2B] rounded-l-2xl h-screen p-6 py-9 ">
      <OrderHeader />
      <OrderList />
      <OrderCheckout discount={0} total={22.59} />
    </div>
  );
};

export default Order;
