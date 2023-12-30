import { useState } from "react";
import Navbar from "./components/navbar/navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home/home";

function App() {
  return (
    <>
      <BrowserRouter>
        <main className="flex bg-[#252836]">
          <Navbar />
          <Routes>
            <Route path="/" element={ <Home /> } />
            <Route
              path="/dashboard"
              element={<h1 className="grow">Dashboard</h1>}
            />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
