import React from "react";

const PaymentButtons = ({bgColor, title}) => {
  return (
<div className={`flex items-center justify-center p-4 w-full rounded-2xl cursor-pointer border border-[#EA7C69] bg-[${bgColor}]`}>
      <p className="font-barlow text-xl font-semibold leading-5 text-white">
        {title}
      </p>
    </div>
  );
};

export default PaymentButtons;
