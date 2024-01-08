import React, { useState } from "react";

const ReportListItem = ({ item }) => {
  const [bgColor, setBgColor] = useState("");
  const [statusColor, setstatusColor] = useState("#ffb672");

  // item.status = complete | prepearing | pending
  const statusVariants = {
    Completed: {
      style: "bg-[#6BE2BE3D] text-[#50D1AA] font-barlow text-base font-medium",
    },
    Preparing: {
      style: "bg-[#9290FE33] text-[#9290FE] font-barlow text-base font-medium",
    },
    Pending: {
      style: "bg-[#FFB57233] text-[#FFB572] font-barlow text-base font-medium",
    }
  };

  const profileVariants = {
    Completed: {
      style: "bg-[#FFB572]",
    },
    Preparing: {
      style: "bg-[#65B0F6]",
    },
    Pending: {
      style: "bg-[#FF7CA3]",
    }
  }
  
  return (
    <section className="flex items-center justify-between">
      <div className="flex items-center gap-8">
        <div className={`rounded-full w-8 h-8 ${profileVariants[item.status].style}`} />
        <h4 className="font-barlow text-sm font-normal leading-5 text-white mr-16 w-20">
          {item.username}
        </h4>
      </div>
      <h4 className="font-barlow text-sm font-normal leading-5 text-white text-start mr-16 w-28">
        {item.menu}
      </h4>
      <h4 className="font-barlow text-sm font-normal leading-5 text-white mr-16 w-12">
        {item.paidprice}
      </h4>
      <div
        className={`flex flex-col items-center justify-center py-1 px-3 rounded-3xl w-28 ${
          statusVariants[item.status].style
        }`}
      >
        <p>{item.status}</p>
      </div>
    </section>
  );
};

export default ReportListItem;
