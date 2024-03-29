import React from 'react'

const RecipeCards = ({ title, photoURL, price, quantity, handleClick }) => {
  return (
    <div className="flex flex-col rounded-3xl bg-[#1F1D2B] p-8 items-center justify-end h-56 w-48"
    onClick={handleClick}>
      <img src={photoURL} alt="mealPhoto" className="rounded-full"/>
        <p className="font-barlow font-medium leading-5 text-white text-sm text-center mt-4 h-32 w-36">{title}</p>
        <p className="font-barlow text-sm font-normal leading-5 text-white text-center">$ {price}</p>
        <p className="font-barlow text-sm font-normal leading-5 text-[#ABBBC2] text-center">{quantity} Bowls available</p>
    </div>
  )
}

export default RecipeCards;