import React from "react";
import { Pencil } from "lucide-react";

const ProductItem = ({ item }) => {
  return (
    <div className="flex flex-col items-center justify-center border border-[#393C49] gap-4 w-min pt-4 rounded-xl">
      <img
        src={item.photoURL}
        alt="mealPhoto"
        className="rounded-full w-24 h-24"
      />
      <h3 className="font-barlow text-base font-medium leading-5 text-white w-36 text-center">
        {item.title}
      </h3>
      <div className="flex items-center justify-center gap-4 w-36">
        <p className=" font-barlow text-sm font-normal leading-5 text-[#ABBBC2]">
          {item.price}
        </p>
        <div className="bg-[#C4C4C4] w-1 h-1 rounded-full" />
        <p className=" font-barlow text-sm font-normal leading-5 text-[#ABBBC2]">
          {item.quantity} Bowls
        </p>
      </div>
      <div className="w-56 bg-[#4f343a] flex items-center justify-center gap-4 rounded-b-xl p-4">
        <Pencil color="#EA7C69" />
        <h4 className="text-[#EA7C69] font-barlow text-base font-semibold leading-5">Edit</h4>
      </div>
    </div>
  );
};

export default ProductItem;
