import React from 'react'

const MenuItem = ({ item, index, setIndex }) => {
  return (
    <div className='flex flex-col items-start cursor-pointer' onClick={() => setIndex(item.index)}>
        <h4 className={`font-barlow text-sm font-semibold leading-5 mb-4 ${item.index === index  ? 'text-[#EA7C69]' : 'text-white'}`}>
            {item.title}
        </h4>
        <div className={` w-full h-1 rounded-full ${item.index === index ? 'bg-[#EA7C69]' : 'bg-transparent'}`}></div>
    </div>
  )
}

export default MenuItem