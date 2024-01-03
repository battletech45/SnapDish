import { useState } from "react";
import Navbar from "./components/navbar/navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home/home";
import Order from "./components/order/order";
import Payment from "./components/payment/payment";

function App() {
  return (
    <>
      <BrowserRouter>
        <main className="flex bg-[#252836]">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/payment" element={<Payment />} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
