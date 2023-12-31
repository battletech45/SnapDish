import React, { useState } from "react";
import OrderTypeButton from "./orderTypeButton";

const OrderHeader = () => {
    const [selected, setSelected] = useState(0);
  return (
    <div>
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
    </div>
  );
};

export default OrderHeader;
