import React from 'react'

const PaymentHeader = () => {
  return (
    <div>
        <h1 className="font-barlow text-white text-3xl font-semibold leading-10 mb-2">Payment</h1>
        <p className="font-barlow text-base font-medium leading-6 text-[#ABBBC2]">3 payment method available</p>
        <div className="h-[2px] w-full bg-[#393C49] my-6" />
    </div>
  )
}

export default PaymentHeader