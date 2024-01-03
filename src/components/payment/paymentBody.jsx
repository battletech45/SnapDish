import React, { useState } from "react";
import { payTypes } from "./payTypes";
import PayMethodCard from "./payMethodCard";

const PaymentBody = () => {
  const [selected, setSelected] = useState("Credit Card");

  return (
    <div>
      <h3 className="font-barlow text-xl font-semibold leading-7 text-white">
        Payment Method
      </h3>
      <div className="flex items-center justify-start gap-8 my-8">
        {payTypes.map((item) => (
          <PayMethodCard
            item={item}
            selected={selected}
            setSelected={setSelected}
          />
        ))}
      </div>
    </div>
  );
};

export default PaymentBody;
