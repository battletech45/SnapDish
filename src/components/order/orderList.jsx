import React from "react";
import OrderListHeader from "./orderListHeader";
import OrderItem from "./orderItem";

const OrderList = () => {

  return (
    <div>
      <OrderListHeader />
      <OrderItem
        photoURL={
          "https://www.themealdb.com/images/media/meals/020z181619788503.jpg"
        }
        title={"Spicy seasoned seafood noodles"}
        price={2.29}
        quantity={20}
      />
      <OrderItem
        photoURL={
          "https://www.themealdb.com/images/media/meals/020z181619788503.jpg"
        }
        title={"Spicy seasoned seafood noodles"}
        price={2.29}
        quantity={20}
      />
    </div>
  );
};

export default OrderList;
