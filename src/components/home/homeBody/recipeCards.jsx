import React from 'react'

const RecipeCards = ({ title, price, quantity }) => {
  return (
    <div className="flex flex-col rounded-3xl bg-[#1F1D2B] p-8 items-center justify-end h-56 w-48">
      <img src="https://www.themealdb.com/images/media/meals/020z181619788503.jpg" alt="mealPhoto" className="rounded-full"/>
        <p className="font-barlow font-medium leading-5 text-white text-sm text-center mt-4">{title}</p>
        <p className="font-barlow text-sm font-normal leading-5 text-white text-center">$ {price}</p>
        <p className="font-barlow text-sm font-normal leading-5 text-[#ABBBC2] text-center">{quantity} Bowls available</p>
    </div>
  )
}

export default RecipeCards;