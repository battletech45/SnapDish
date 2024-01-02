import React from 'react'

const OrderCheckout = ({discount, total}) => {
  return (
    <div className="flex flex-col gap-8 border-t border-[#393C49] pt-4 fixed bottom-5 w-[30%]">
        <div className='flex items-center justify-between'>
            <p className="font-barlow text-base text-[#ABBBC2] font-normal leading-5">Discount</p>
            <p className="font-barlow text-base font-medium leading-6 text-white">$ {discount}</p>
        </div>
        <div className='flex items-center justify-between'>
            <p className="font-barlow text-base text-[#ABBBC2] font-normal leading-5">Sub total</p>
            <p className="font-barlow text-base font-medium leading-6 text-white">$ {total}</p>
        </div>
        <div className="flex items-center justify-center p-4 w-full rounded-2xl bg-[#EA7C69]">
            <p className="font-barlow text-xl font-semibold leading-5 text-white">Continue to Payment</p>
        </div>
    </div>
  )
}

export default OrderCheckout