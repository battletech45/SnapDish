import React from "react";
import { dashboardInfoData } from "./dashboardInfoData";
import InfoCard from "./infoCard";
import DashboardReport from "./report/dashboardReport";

const DashboardBody = () => {
  return (
    <section>
      <div className="flex items-center justify-between gap-16">
        {dashboardInfoData.map((item) => (
          <InfoCard item={item} />
        ))}
      </div>
      <DashboardReport />
    </section>
  );
};

export default DashboardBody;
