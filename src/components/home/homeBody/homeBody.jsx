import React from "react";
import BodyTitle from "./bodyTitle";
import RecipeCards from "./recipeCards";
import { dummyData } from "./dummyData";

const HomeBody = () => {
  return (
    <div className="p-8 flex flex-col gap-12">
      <BodyTitle />
      <div className="grid gap-x-16 gap-y-16 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-start">
        {dummyData.map((item) => (
          <RecipeCards title={item.title} photoURL={item.photoURL} price={item.price} quantity={item.quantity}/>
        ))}
      </div>
    </div>
  );
};

export default HomeBody;
