import React from "react";
import { Settings2 } from 'lucide-react';

const ReportHeader = () => {
  return (
    <div className="flex items-center justify-between p-8">
      <h3 className="font-barlow text-xl font-semibold leading-7 text-white">
        Order Report
      </h3>
      <div className="flex items-center justify-between p-4 border border-[#393C49] bg-[#1F1D2B] gap-2 rounded-lg">
        <Settings2 color="white"/>
        <p className="font-barlow text-base font-medium leading-5 text-white">Filter Order</p>
      </div>
    </div>
  );
};

export default ReportHeader;
