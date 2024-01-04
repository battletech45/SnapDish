import React, {useState, useEffect } from 'react'

const DashboardHeader = () => {
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
    <div>
        <h1 className="font-barlow text-white text-3xl font-semibold leading-10 mb-2">Dashboard</h1>
        <p className="font-barlow text-base font-medium leading-6 text-[#ABBBC2]">{formattedDate}</p>
        <div className="h-[2px] w-full bg-[#393C49] my-6" />
    </div>
  )
}

export default DashboardHeader