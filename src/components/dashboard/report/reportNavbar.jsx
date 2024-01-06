import React from "react";

const ReportNavbar = () => {
  return (
    <div className="flex border-b border-[#393C49] py-4 justify-between px-16">
      <p className="font-barlow text-sm font-semibold leading-5 text-white mr-4">
        Customer
      </p>
      <p className="font-barlow text-sm font-semibold leading-5 text-white">
        Menu
      </p>
      <p className="font-barlow text-sm font-semibold leading-5 text-white">
        Total Payment
      </p>
      <p className="font-barlow text-sm font-semibold leading-5 text-white">
        Status
      </p>
    </div>
  );
};

export default ReportNavbar;
