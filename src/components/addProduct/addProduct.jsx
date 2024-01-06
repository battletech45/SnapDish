import React from "react";
import MostOrderHeader from "../dashboard/mostOrder/mostOrderHeader";
import Menu from "../home/homeHeader/menu";
import { dummyData } from "../home/homeBody/dummyData";
import ProductItem from "./productItem";

const AddProduct = () => {
  return (
    <section className="flex grow p-12 h-screen">
      <section className="grow flex flex-col ml-24 p-8 bg-[#1F1D2B] rounded-xl">
        <MostOrderHeader title={"Add Product"} />
        <Menu />
        <div className="grid gap-x-16 gap-y-16 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center overflow-y-scroll my-4">
          {dummyData.map((item) => (
            <ProductItem item={item} />
          ))}
        </div>
      </section>
    </section>
  );
};

export default AddProduct;
