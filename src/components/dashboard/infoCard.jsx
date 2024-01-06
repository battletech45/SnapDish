import React from "react";
import { ArrowUp, ArrowDown } from "lucide-react";

const InfoCard = ({ item }) => {
  const Icon = item.icon;
  return (
    <section className="flex flex-col gap-4 bg-[#1F1D2B] p-6 rounded-xl w-full my-4 items-center">
      <div className="flex items-center justify-start gap-4">
        <div className="flex items-center justify-center rounded-lg p-2 w-10 h-10 bg-[#252836]">
          <Icon color={item.iconColor} />
        </div>
        <p className={`font-barlow text-base font-medium leading-4 ${ item.percent > 0 ? "text-[#50D1AA]" : "text-[#FF7CA3]"}`}>
          {item.percent}%
        </p>
        <div
          className={`rounded-full flex items-center justify-center w-6 h-6 ${
            item.percent > 0 ? "bg-[#88E0913D]" : "bg-[#FF64713D]"
          }`}
        >
          {item.percent > 0 ? (
            <ArrowUp color="#50D1AA" />
          ) : (
            <ArrowDown color="#FF7CA3" />
          )}
        </div>
      </div>
      <h3 className="font-barlow text-3xl font-semibold leading-10 text-white">
        {item.mainData}
      </h3>
      <h5 className="font-barlow text-base font-medium leading-5 text-white">
        {item.title}
      </h5>
    </section>
  );
};

export default InfoCard;
