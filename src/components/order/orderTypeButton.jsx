import React from "react";

const OrderTypeButton = ({ title, selected, setSelected }) => {
  return (
    <div
      className={`flex items-center justify-center px-3 py-2 rounded-lg cursor-pointer ${
        selected
          ? "bg-[#EA7C69] border border-[#EA7C69]"
          : "bg-[#1F1D2B] border border-[#393C49]"
      }`}
      onClick={setSelected}
    >
      <p className={`font-barlow text-base font-semibold leading-5 ${selected ? 'text-white' : 'text-[#EA7C69]'}`}>{title}</p>
    </div>
  );
};

export default OrderTypeButton;
