import { useState } from "react";
import Accordion from "../ui/Accordion";

const FiltersSidebar = () => {
  const [priceRange, setPriceRange] = useState(300);
  return (
    <div className="flex flex-col gap-6">
      {/* categories filter */}
      <div className="w-full">
        <Accordion
          label={"Categories"}
          content={
            <ul className="mt-3 space-y-1">
              {["Men's", "Women's", "Kid's"].map((item, index) => (
                <li key={index} className="text-xs">
                  {item}
                </li>
              ))}
            </ul>
          }
        />
      </div>

      {/* price filter */}
      <div className="w-full">
        <Accordion
          label={"Price"}
          content={
            <>
              <input
                min={0}
                max={1000}
                type="range"
                value={priceRange}
                className="w-full accent-black/70"
                onChange={(e) => setPriceRange(Number(e.target.value))}
              />
              <div className="flex justify-between items-center text-gray-500">
                <div className="flex font-semibold text-sm">
                  <label className="px-1 py-3 border-l border-t border-b border-gray-400">
                    $
                  </label>
                  <input
                    type="text"
                    readOnly
                    value="0"
                    className="border-t border-b border-r border-gray-400 py-3 w-14 text-right px-1"
                  />
                </div>
                <div className="text-center font-semibold">
                  <span className="text-sm">to</span>
                </div>

                <div className="flex text-sm font-semibold">
                  <label className="px-1 py-3 border-l border-t border-b border-gray-400">
                    $
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={priceRange}
                    className="border-t border-b border-r border-gray-400 py-3 w-14 text-right px-1"
                  />
                </div>
              </div>
            </>
          }
        />
      </div>

      <button className="w-full py-3 px-4 bg-black/90 font-semibold hover:bg-black/80 cursor-pointer text-white uppercase tracking-wide">
        Apply
      </button>
    </div>
  );
};

export default FiltersSidebar;
