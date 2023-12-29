import React, { useState } from "react";
import logo from "../../assets/icons/snapLogo.svg";
import NavbarItem from "./navbarItem";
import NavbarTitle from "./navbarTitle";
import { navbarLinks } from "./navbarLinks";

const Navbar = () => {

  return (
    <div className="bg-[#1F1D2B] h-screen w-20 md:w-24 items-center justify-between flex flex-col py-4 rounded-r-2xl">
      <NavbarTitle photo={logo} /> 
      {navbarLinks.map((item) => (
        <NavbarItem
          item={item}
        />
      ))}
    </div>
  );
};

export default Navbar;
