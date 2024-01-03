import React from "react";

const PayMethodCard = ({ item, selected, setSelected }) => {
  const Icon = item.icon;
  return (
    <div
      className={`h-16 w-24 rounded-lg flex flex-col items-center justify-center bg-[#252836] border ${
        item.title === selected ? "border-[#ABBBC2]" : "border-[#393C49]"
      }`}
      onClick={() => setSelected(item.title)}
    >
      <Icon color={item.title === selected ? "white" : "#ABBBC2"} />
      <p
        className={`font-barlow text-sm font-medium leading-6 ${
          item.title === selected ? "text-white" : "text-[#ABBBC2]"
        }`}
      >
        {item.title}
      </p>
    </div>
  );
};

export default PayMethodCard;
