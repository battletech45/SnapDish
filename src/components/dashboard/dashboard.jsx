import React from "react";
import DashboardHeader from "./dashboardHeader";
import DashboardBody from "./dashboardBody";

const Dashboard = () => {
  return (
    <section className="flex grow">
      <div className="grow flex flex-col h-screen ml-24 bg-[#252836] p-8">
        <DashboardHeader />
        <DashboardBody />
      </div>
    </section>
  );
};

export default Dashboard;
