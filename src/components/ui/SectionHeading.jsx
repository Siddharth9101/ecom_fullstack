import React from "react";

const SectionHeading = ({ label }) => {
  return (
    <section className="pb-6">
      <div className="heading-new-arrivals flex justify-between items-center px-8">
        <div className="border border-black/80 md:w-[30%] w-[25%] h-1 bg-black/80" />
        <h2 className="uppercase font-extrabold text-xl tracking-wider">
          {label}
        </h2>
        <div className="border border-black/80 md:w-[30%] w-[25%] h-1 bg-black/80" />
      </div>
      <div className="w-full text-center text-xs cursor-pointer mt-3">
        <span className="border-b border-black pb-1">View All</span>
      </div>
    </section>
  );
};

export default SectionHeading;
