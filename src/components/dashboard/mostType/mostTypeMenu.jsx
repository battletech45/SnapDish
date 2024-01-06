import React from 'react'

const MostTypeMenu = () => {
  return (
    <main className="flex flex-col gap-4">
        <section className="flex items-start justify-start gap-2">
            <div className=" rounded-full w-5 h-5 bg-[#FF7CA3] mt-1" />
            <div className="flex flex-col">
                <p className="font-barlow text-lg font-medium text-white leading-6">Dine In</p>
                <p className="font-barlow text-sm font-normal leading-4 text-[#ABBBC2]">200 customers</p>
            </div>
        </section>
        <section className="flex items-start justify-start gap-2">
            <div className=" rounded-full w-5 h-5 bg-[#FFB572] mt-1" />
            <div className="flex flex-col">
                <p className="font-barlow text-lg font-medium text-white leading-6">To Go</p>
                <p className="font-barlow text-sm font-normal leading-4 text-[#ABBBC2]">122 customers</p>
            </div>
        </section>
        <section className="flex items-start justify-start gap-2">
            <div className=" rounded-full w-5 h-5 bg-[#65B0F6] mt-1" />
            <div className="flex flex-col">
                <p className="font-barlow text-lg font-medium text-white leading-6">Delivery</p>
                <p className="font-barlow text-sm font-normal leading-4 text-[#ABBBC2]">264 customers</p>
            </div>
        </section>
    </main>
  )
}

export default MostTypeMenu