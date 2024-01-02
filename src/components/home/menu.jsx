import React, { useState } from 'react'
import MenuItem from './menuItem'

const Menu = () => {
    const [isSelected, setIsSelected] = useState(false);
  return (
    <div className="flex gap-8 items-center">
        <MenuItem title={'Hot Dishes'} isSelected={isSelected}/>
        <MenuItem title={'Cold Dishes'} isSelected={isSelected}/>
        <MenuItem title={'Soup'} isSelected={isSelected}/>
        <MenuItem title={'Grill'} isSelected={isSelected}/>
        <MenuItem title={'Appetizer'} isSelected={isSelected}/>
        <MenuItem title={'Dessert'} isSelected={isSelected}/>
    </div>
  )
}

export default Menu