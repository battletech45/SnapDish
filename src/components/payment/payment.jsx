import React from 'react'
import PaymentHeader from './paymentHeader'
import PaymentBody from './paymentBody'

const Payment = () => {
  return (
    <div className="grow flex flex-col h-screen ml-24 mr-[33%] bg-[#252836] p-8">
        <PaymentHeader />
        <PaymentBody />
    </div>
  )
}

export default Payment