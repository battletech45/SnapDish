import React, { useState, useEffect } from "react";
import SearchBar from "./searchBar";
import Menu from "./menu";

const HomeHeader = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formattedDate = currentDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-barlow text-3xl font-semibold leading-10 text-white">
            Altay Taneri
          </h1>
          <h3 className="font-barlow text-base font-normal leading-6 text-[#E0E6E9]">
            {formattedDate}
          </h3>
        </div>
        <SearchBar />
      </div>
      <Menu />
    </div>
  );
};

export default HomeHeader;
