import React, { useState } from "react";

const ReportListItem = ({ item }) => {
  const [bgColor, setBgColor] = useState("");
  const [statusColor, setstatusColor] = useState("#ffb672");

  return (
    <section className="flex items-center justify-between">
      <div className="flex items-center gap-8">
        <div className={`rounded-full w-8 h-8 bg-[#fb7bff]`} />
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
      <div className="flex items-center justify-center py-1 px-3 rounded-3xl bg-[#4b3b39] w-28">
        <p className={`text-[#ffb672]`}>{item.status}</p>
      </div>
    </section>
  );
};

export default ReportListItem;
