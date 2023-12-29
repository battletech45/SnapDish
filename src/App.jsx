import { useState } from "react";
import Navbar from "./components/navbar/navbar";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="bg-[#252836] w-screen h-screen">
          <Navbar />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
