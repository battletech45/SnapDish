import React, { useEffect, useState } from "react";
import DashboardHeader from "./dashboardHeader";
import DashboardBody from "./dashboardBody";
import MostOrder from "./mostOrder/mostOrder";
import MostType from "./mostType/mostType";

const Dashboard = () => {
  return (
    <section className="flex flex-col grow h-full xl:flex-row bg-[#252836]">
      <div className="flex flex-col h-screen ml-24 p-8 xl:grow">
        <DashboardHeader />
        <DashboardBody />
      </div>
      <div className="flex p-8 py-9 justify-between gap-2 ml-24 mt-12 xl:mt-0 xl:flex-col xl:grow xl:ml-0">
        <MostOrder />
        <MostType />
      </div>
    </section>
  );
};

export default Dashboard;
