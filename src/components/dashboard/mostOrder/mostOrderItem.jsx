import React from "react";

const MostOrderItem = ({ item }) => {
  return (
    <div className="flex items-center justify-start gap-8 my-4">
      <img src={item.photoURL} alt="mealPhoto" className="rounded-full w-12 h-12" />
      <div className="flex flex-col justify-start gap-1">
        <p className="font-barlow text-sm font-medium leading-5 text-[#E0E6E9]">
          {item.title}
        </p>
        <p className="font-barlow text-xs font-normal leading-4 text-[#ABBBC2]">
          {item.quantity} dishes ordered
        </p>
      </div>
    </div>
  );
};

export default MostOrderItem;
