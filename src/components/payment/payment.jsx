import React from "react";
import PaymentHeader from "./paymentHeader";
import PaymentBody from "./paymentBody";
import Order from "../order/order";

const Payment = () => {
  return (
    <section className="flex grow">
      <div className="grow flex flex-col h-screen ml-24 bg-[#252836] p-8">
        <PaymentHeader />
        <PaymentBody />
      </div>
      <Order />
    </section>
  );
};

export default Payment;
