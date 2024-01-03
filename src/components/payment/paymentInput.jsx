import React from "react";

const PaymentInput = ({ title, type, input, setInput }) => {

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="flex flex-col w-full">
      <h5 className="font-barlow text-sm font-medium leading-6 text-white">{title}</h5>
      <input
        type={type}
        value={input}
        onChange={handleInputChange}
        placeholder="Type here..."
        className="flex p-4 gap-2 items-start rounded-lg border border-[#393C49] bg-[#2D303E] text-white"
      />
    </div>
  );
};

export default PaymentInput;
