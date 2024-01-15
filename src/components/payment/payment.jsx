import React from "react";
import PaymentHeader from "./paymentHeader";
import PaymentBody from "./paymentBody";
import Order from "../order/order";

const Payment = () => {
  return (
    <section className="flex grow h-screen">
      <div className="grow flex flex-col ml-24 bg-[#252836] p-8">
        <PaymentHeader />
        <PaymentBody />
      </div>
      <Order />
    </section>
  );
};

export default Payment;
