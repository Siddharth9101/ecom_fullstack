import { useEffect, useState } from "react";
import Accordion from "../ui/Accordion";
import { useDispatch } from "react-redux";
import { filterByCat, filterByPrice } from "../../store/productsSlice";

const FiltersSidebar = () => {
  const [priceRange, setPriceRange] = useState(2000);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(filterByPrice(priceRange));
  }, [priceRange]);

  return (
    <div className="flex flex-col gap-6">
      {/* categories filter */}
      <div className="w-full">
        <Accordion
          label={"Categories"}
          content={
            <ul className="mt-3 space-y-1">
              {[
                { label: "Men's", cat: "Men's Wear" },
                { label: "Women's", cat: "Women's Wear" },
                { label: "Kid's", cat: "Kid's Wear" },
              ].map((item, index) => (
                <li
                  key={index}
                  className="text-xs cursor-pointer"
                  onClick={() => {
                    dispatch(filterByCat(item.cat));
                  }}
                >
                  {item.label}
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
                max={3000}
                type="range"
                value={priceRange}
                className="w-full accent-black/70 outline-none"
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
                    className="border-t border-b border-r border-gray-400 py-3 w-14 text-right px-1 outline-none"
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
                    className="border-t border-b border-r border-gray-400 py-3 w-14 text-right px-1 outline-none"
                  />
                </div>
              </div>
            </>
          }
        />
      </div>
    </div>
  );
};

export default FiltersSidebar;
