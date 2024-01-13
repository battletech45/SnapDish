import React from "react";
import MostOrderHeader from "../mostOrder/mostOrderHeader";
import MostTypeGraphic from "./mostTypeGraphic";
import MostTypeMenu from "./mostTypeMenu";

const MostType = () => {
  return (
    <div className="flex flex-col rounded-xl p-8 bg-[#1F1D2B]">
      <MostOrderHeader title={"Most Type of Order"} />
      <div className="bg-[#393C49] w-full h-[2px]" />
      <div className="flex items-center h-full justify-center my-4 gap-4 lg:gap-16">
        <MostTypeGraphic />
        <MostTypeMenu />
      </div>
    </div>
  );
};

export default MostType;
