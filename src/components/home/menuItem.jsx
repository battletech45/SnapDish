import React from 'react'

const MenuItem = ({ title, isSelected }) => {
  return (
    <div className='flex flex-col items-start'>
        <h4 className={`font-barlow text-sm font-semibold leading-5 mb-4 ${isSelected ? 'text-[#EA7C69]' : 'text-white'}`}>
            {title}
        </h4>
        <div className={`w-9 h-1 rounded-full ${isSelected ? 'bg-[#EA7C69]' : 'bg-transparent'}`}></div>
    </div>
  )
}

export default MenuItem