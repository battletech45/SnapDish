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
            <Route
              path="/"
              element={
                <div className="flex grow">
                  <Home />
                  <Order />
                </div>
              }
            />
            <Route
              path="/dashboard"
              element={
                <div className="flex grow">
                  <Payment />
                  <Order />
                </div>
              }
            />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
