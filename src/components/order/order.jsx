import React, { useState } from "react";
import OrderTypeButton from "./orderTypeButton";
import OrderList from "./orderList";
import OrderCheckout from "./orderCheckout";

const Order = () => {
  const [selected, setSelected] = useState(0);
  return (
    <div className=" w-1/3 bg-[#1F1D2B] rounded-l-2xl h-screen fixed right-0 p-6 py-9">
      <h3 className="font-barlow text-xl font-semibold leading-7 text-white">
        Orders
      </h3>
      <div className="flex gap-4 items-center justify-start my-6">
        <OrderTypeButton
          title={"Dine In"}
          selected={selected === 0}
          setSelected={() => setSelected(0)}
        />
        <OrderTypeButton
          title={"To Go"}
          selected={selected === 1}
          setSelected={() => setSelected(1)}
        />
        <OrderTypeButton
          title={"Delivery"}
          selected={selected === 2}
          setSelected={() => setSelected(2)}
        />
        
      </div>
      <OrderList />
      <OrderCheckout discount={0} total={22.59} />
    </div>
  );
};

export default Order;
