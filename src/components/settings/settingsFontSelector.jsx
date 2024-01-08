import React, { useState } from "react";

const SettingsFontSelector = () => {
  const [selectedSize, setSelectedSize] = useState("16px");
  const sampleText = "Sample Text";

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  return (
    <div className="flex gap-2 items-center">
      <label className="font-barlow text-sm font-normal leading-4 text-center text-[#ABBBC2]">
        Select Font Size
      </label>
      <select id="fontSize" value={selectedSize} onChange={handleSizeChange}>
        <option value="12px">12px</option>
        <option value="16px">16px</option>
        <option value="20px">20px</option>
        <option value="24px">24px</option>
      </select>
    </div>
  );
};

export default SettingsFontSelector;
