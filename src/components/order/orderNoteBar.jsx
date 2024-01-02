import React, { useState } from "react";
import { Trash } from "lucide-react";

const OrderNoteBar = () => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="my-4 flex items-center justify-between gap-6">
      <input
        type="text"
        placeholder="Order Note..."
        className="flex p-7 items-start gap-2 border text-white border-[#393C49] bg-[#2D303E] rounded-xl h-12 w-[27.5rem]"
        value={inputValue}
        onChange={handleInputChange}
      />
      <div
        className={`flex items-center justify-center p-4 h-12 w-12 rounded-lg bg-[#2D303E] border cursor-pointer ${
          inputValue !== "" ? "border-[#FF7CA3]" : "border-[#EA7C69]"
        }`}
      >
        <Trash color={inputValue !== "" ? "#FF7CA3" : "#EA7C69"} />
      </div>
    </div>
  );
};

export default OrderNoteBar;
