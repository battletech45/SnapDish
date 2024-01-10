import React from 'react'
import MostOrderHeader from './mostOrderHeader'
import MostOrderItem from './mostOrderItem'
import { mostOrderItems } from './mostOrderItems'
import MostOrderButton from './mostOrderButton'

const MostOrder = () => {
  return (
    <div className="flex flex-col rounded-xl p-8 bg-[#1F1D2B]">
        <MostOrderHeader title={'Most Ordered'}/>
        <div className="bg-[#393C49] w-full h-[2px]"/>
        {mostOrderItems.map((item) => (
            <MostOrderItem item={item}/>
        ))}
        <MostOrderButton bgColor={'#1F1D2B'} title={'View All'}/>
    </div>
  )
}

export default MostOrder