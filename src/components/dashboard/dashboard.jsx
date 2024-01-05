import React from "react";
import DashboardHeader from "./dashboardHeader";
import DashboardBody from "./dashboardBody";
import MostOrder from "./mostOrder/mostOrder";
import MostType from "./mostType/mostType";

const Dashboard = () => {
  return (
    <section className="flex grow">
      <div className="grow flex flex-col h-screen ml-24 bg-[#252836] p-8">
        <DashboardHeader />
        <DashboardBody />
      </div>
      <div className="flex flex-col h-screen p-8">
        <MostOrder />
        <MostType />
      </div>
    </section>
  );
};

export default Dashboard;
