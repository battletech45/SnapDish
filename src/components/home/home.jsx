import React from "react";
import HomeHeader from "./homeHeader/homeHeader";
import HomeBody from "./homeBody/homeBody";
import Order from "../order/order";

const Home = () => {
  return (
    <section className="flex grow">
      <section className="grow flex flex-col ml-20 md:ml-24 h-screen overflow-y-scroll">
        <HomeHeader />
        <HomeBody />
      </section>
      <Order />
    </section>
  );
};

export default Home;
