import React from "react";
import { Plus } from 'lucide-react';

const DashedProductItem = () => {
  return (
    <div className="flex flex-col items-center justify-center outline-dashed outline-[#EA7C69] gap-4 p-4 rounded-xl w-52 h-64">
      <Plus color="#EA7C69"/>
      <p className="text-[#EA7C69] font-barlow text-base font-semibold leading-6">Add new dish</p>
    </div>
  );
};

export default DashedProductItem;
