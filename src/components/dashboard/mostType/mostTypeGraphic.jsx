import React from "react";

const MostTypeGraphic = () => {
  return (
    <div className={`w-40 lg:w-44 h-40 lg:h-44 rounded-full border-8 border-[#65B0F6]`}>
      <MostTypeYellowGraphic />
    </div>
  );
};

const MostTypeYellowGraphic = () => {
  return (
    <div className={`w-36 lg:w-40 h-36 lg:h-40 rounded-full border-8 border-[#FFB572]`}>
      <MostTypePinkGraphic />
    </div>
  );
};

const MostTypePinkGraphic = () => {
  return <div className={`w-32 lg:w-36 h-32 lg:h-36 rounded-full border-8 border-[#FF7CA3]`} />;
};

export default MostTypeGraphic;
