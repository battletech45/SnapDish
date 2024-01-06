import React from "react";

const SettingsCard = ({ item, selected, setSelected }) => {
    const Icon = item.icon;

  return (
    <section className={`flex items-start justify-between p-6 pr-0 ${selected === item.index ? 'bg-[#EA7C6942]' : 'bg-transparent'}`} onClick={() => setSelected(item.index)}>
        <div className="flex gap-4 items-center">
        <Icon color={selected === item.index ? '#EA7C69' : 'white'} />
      <div className="flex flex-col">
        <p className={`font-barlow text-lg font-medium text-${selected === item.index ? '[#EA7C69]' : 'white'} leading-6`}>
          {item.title}
        </p>
        <p className="font-barlow text-sm font-normal leading-4 text-[#ABBBC2]">
          {item.subtitle}
        </p>
      </div>
        </div>
      <div className={`rounded-3xl h-10 w-1 ${selected === item.index ? 'bg-[#EA7C69]' : 'bg-transparent'}`}/>
    </section>
  );
};

export default SettingsCard;
