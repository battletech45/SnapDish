import React from "react";
import BodyTitle from "./bodyTitle";
import RecipeCards from "./recipeCards";

const HomeBody = () => {
  return (
    <div className="p-8 flex flex-col gap-12">
      <BodyTitle />
      <div className="grid gap-x-16 gap-y-16 grid-cols-2 md:grid-cols-4 place-items-start">
        <RecipeCards
          title={"Spicy seasoned seafood noodles"}
          price={2.29}
          quantity={20}
        />
        <RecipeCards
          title={"Spicy seasoned seafood noodles"}
          price={2.29}
          quantity={20}
        />
        <RecipeCards
          title={"Spicy seasoned seafood noodles"}
          price={2.29}
          quantity={20}
        />
        <RecipeCards
          title={"Spicy seasoned seafood noodles"}
          price={2.29}
          quantity={20}
        />
        <RecipeCards
          title={"Spicy seasoned seafood noodles"}
          price={2.29}
          quantity={20}
        />
        <RecipeCards
          title={"Spicy seasoned seafood noodles"}
          price={2.29}
          quantity={20}
        />
        <RecipeCards
          title={"Spicy seasoned seafood noodles"}
          price={2.29}
          quantity={20}
        />
        <RecipeCards
          title={"Spicy seasoned seafood noodles"}
          price={2.29}
          quantity={20}
        />
        <RecipeCards
          title={"Spicy seasoned seafood noodles"}
          price={2.29}
          quantity={20}
        />
        <RecipeCards
          title={"Spicy seasoned seafood noodles"}
          price={2.29}
          quantity={20}
        />
        <RecipeCards
          title={"Spicy seasoned seafood noodles"}
          price={2.29}
          quantity={20}
        />
        <RecipeCards
          title={"Spicy seasoned seafood noodles"}
          price={2.29}
          quantity={20}
        />
        <RecipeCards
          title={"Spicy seasoned seafood noodles"}
          price={2.29}
          quantity={20}
        />
        <RecipeCards
          title={"Spicy seasoned seafood noodles"}
          price={2.29}
          quantity={20}
        />
        <RecipeCards
          title={"Spicy seasoned seafood noodles"}
          price={2.29}
          quantity={20}
        />
      </div>
    </div>
  );
};

export default HomeBody;
