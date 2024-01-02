import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavbarItem = ({ item }) => {

  const Icon = item.icon;
  let location = useLocation();
  console.log(location);
  const handleClick = () => {
    if (item.name === "Logout") return;
    setSelected(item.index);
  };
  return (
    <Link
    to={item.href}
      className={`w-16 h-16 flex items-center justify-center rounded-2xl md:w-20 md:h-20 ${
        location.pathname === item.href && item.name !== "Logout"
          ? "bg-[#252836]"
          : "bg-transparent"
      }`}
    >
      <div
        className={`items-center justify-center flex w-10 h-10 rounded-lg md:w-14 md:h-14 ${
          location.pathname === item.href && item.name !== "Logout"
            ? "bg-[#EA7C69]"
            : "bg-transparent"
        }`}
        onClick={handleClick}
      >
        <Icon
          color={
            location.pathname === item.href && item.name !== "Logout"
              ? "white"
              : "#EA7C69"
          }
          className="shrink-0 w-5 md:w-8"
        />
        <span className="sr-only">{item.name}</span>
      </div>
    </Link>
  );
};

export default NavbarItem;
