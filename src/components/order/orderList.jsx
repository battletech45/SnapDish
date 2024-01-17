import React from "react";
import OrderListHeader from "./orderListHeader";
import OrderItem from "./orderItem";
import { orderItems } from "./orderItems";
import { useOrder } from "../../stores/useOrderStore";

const OrderList = () => {

  const { order } = useOrder();
  return (
    <div className="flex flex-col grow relative overflow-y-scroll">
      <OrderListHeader />
      <div className="mt-10">
      {
        order.map((item) => (
          <OrderItem item={item}/>
        ))
      }
      </div>
    </div>
  );
};

export default OrderList;
