import React from "react";
import { Settings2 } from "lucide-react";

const MostOrderHeader = ({title}) => {
  return (
    <div className="flex items-center justify-between pb-4">
      <h2 className="font-barlow text-xl font-semibold leading-7 text-white">
        {title}
      </h2>
      <div className="flex items-center justify-between p-3 border border-[#393C49] bg-[#1F1D2B] gap-2 rounded-lg">
        <Settings2 color="white" />
        <p className="font-barlow text-base font-medium leading-5 text-white">
          Today
        </p>
      </div>
    </div>
  );
};

export default MostOrderHeader;
