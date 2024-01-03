import React from "react";
import OrderListHeader from "./orderListHeader";
import OrderItem from "./orderItem";
import { orderItems } from "./orderItems";

const OrderList = () => {
  return (
    <div className="flex flex-col grow relative overflow-y-scroll">
      <OrderListHeader />
      <div className="mt-10">
      {
        orderItems.map((item) => (
          <OrderItem item={item}/>
        ))
      }
      </div>
    </div>
  );
};

export default OrderList;
