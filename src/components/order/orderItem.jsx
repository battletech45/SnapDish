import React from "react";
import OrderNoteBar from "./orderNoteBar";

const OrderItem = ({ item }) => {
  return (
    <section className="my-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
        <img src={item.photoURL} alt="mealPhoto" className="rounded-full w-10 h-10"/>
          <div className="flex flex-col items-start w-36">
            <p className="font-barlow text-base text-white font-medium leading-6 overflow-clip line-clamp-1">
              {item.title}
            </p>
            <p className="font-barlow text-sm font-medium leading-4 text-[#ABBBC2]">
              $ {item.price}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex w-12 h-12 p-4 justify-center items-center border border-[#393C49] bg-[#2D303E] rounded-lg">
            <p className="font-barlow text-base font-medium leading-6 text-white">
              {item.quantity}
            </p>
          </div>
          <p className="font-barlow text-base text-white font-medium leading-6 px-1">
            $ {item.price}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between gap-6">
        <OrderNoteBar />
      </div>
    </section>
  );
};

export default OrderItem;
