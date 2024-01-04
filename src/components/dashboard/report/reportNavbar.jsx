import React from "react";

const ReportNavbar = () => {
  return (
    <div className="flex px-8 border-b border-[#393C49] py-4">
      <p className="font-barlow text-sm font-semibold leading-5 text-white">
        Customer
      </p>
      <p className="font-barlow text-sm font-semibold leading-5 text-white ml-40 mr-28">
        Menu
      </p>
      <p className="font-barlow text-sm font-semibold leading-5 text-white mr-20">
        Total Payment
      </p>
      <p className="font-barlow text-sm font-semibold leading-5 text-white">
        Status
      </p>
    </div>
  );
};

export default ReportNavbar;
