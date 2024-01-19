import React, { useState } from "react";

import OrderList from "./orderList";
import OrderCheckout from "./orderCheckout";
import OrderHeader from "./orderHeader";
import { useOrder } from "../../stores/useOrderStore";

const Order = () => {
  const { order } = useOrder();

  return (
    <div className="flex flex-col w-1/3 bg-[#1F1D2B] rounded-l-2xl h-screen p-6 py-9 ">
      <OrderHeader />
      <OrderList />
      <OrderCheckout
        discount={0.0}
        total={order
          .reduce((acc, item) => acc + item.amount * item.price, 0)
          .toFixed(2)}
      />
    </div>
  );
};

export default Order;
