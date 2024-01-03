import React, { useState } from "react";
import { payTypes } from "./payTypes";
import PayMethodCard from "./payMethodCard";
import PaymentInput from "./paymentInput";
import PaymentButtons from "./paymentButtons";

const PaymentBody = () => {
  const [selected, setSelected] = useState("Credit Card");
  const [cardHolderName, setCardHolderName] = useState("");
  const [cardNumber, setCardNumber] = useState(0);
  const [password, setPassword] = useState(0);
  const [expireDate, setExpireDate] = useState('');

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
      <div className="flex items-center justify-center gap-8 my-8">
        <PaymentInput
          title={"Cardholder Name"}
          type={"text"}
          input={cardHolderName}
          setInput={setCardHolderName}
        />
        <PaymentInput
          title={"Card Number"}
          type={"number"}
          input={cardNumber}
          setInput={setCardNumber}
        />
      </div>
      <div className="flex items-center justify-center gap-8 my-8">
        <PaymentInput
          title={"Expiration Date"}
          type={"month"}
          input={expireDate}
          setInput={setExpireDate}
        />
        <PaymentInput
          title={"CVV"}
          type={"password"}
          input={password}
          setInput={setPassword}
        />
      </div>
      <div className="bg-[#393C49] w-full h-[2px] my-20" />
      <div className="flex items-center gap-12">
        <PaymentButtons title={"Cancel"} bgColor={"#252836"} />
        <PaymentButtons title={"Confirm Payment"} bgColor={"#EA7C69"} />
      </div>
    </div>
  );
};

export default PaymentBody;
