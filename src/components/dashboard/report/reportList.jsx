import React from "react";
import { orders } from "./orders";
import ReportListItem from "./reportListItem";

const ReportList = () => {
  return (
    <div className="flex flex-col gap-4 p-8">
      {orders.map((item) => (
        <ReportListItem item={item} />
      ))}
    </div>
  );
};

export default ReportList;
