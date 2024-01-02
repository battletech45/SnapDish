import React, { useState } from 'react';
import MenuItem from './menuItem';
import { menuCategories } from "./menuCategories"

const Menu = () => {
    const [index, setIndex] = useState(0);
  return (
    <div className="flex gap-8 items-center border-b border-[#393C49]">
        {menuCategories.map((item) => (
        <MenuItem
          item={item} 
          index={index}
          setIndex={setIndex}
        />
      ))}
    </div>
  )
}

export default Menu