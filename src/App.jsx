import { useState } from "react";
import Navbar from "./components/navbar/navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home/home";
import Payment from "./components/payment/payment";
import Dashboard from "./components/dashboard/dashboard";
import Settings from "./components/settings/settings";
import AddProduct from "./components/addProduct/addProduct";

function App() {
  return (
    <>
      <BrowserRouter>
        <main className="flex bg-[#252836]">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/addproduct" element={<AddProduct />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
