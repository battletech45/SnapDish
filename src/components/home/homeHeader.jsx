import React, { useState, useEffect } from "react";

const HomeHeader = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formattedDate = currentDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: '2-digit',
  });

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="font-barlow text-3xl font-semibold leading-10 text-white">
          Altay Taneri
        </h1>
        <h3 className="font-barlow text-base font-normal leading-6 text-[#E0E6E9]">{formattedDate}</h3>
      </div>
    </div>
  );
};

export default HomeHeader;
