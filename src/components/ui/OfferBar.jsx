import { AiFillThunderbolt } from "react-icons/ai";
import Marquee from "react-fast-marquee";

const OfferBar = () => {
  return (
    <div className="w-screen bg-[#FFE8E8] py-1 cursor-pointer" id="top">
      <Marquee pauseOnHover speed={100}>
        {[0, 1, 2, 3].map((i, idx) => (
          <div
            key={idx}
            className="flex items-center gap-1 text-rose-600 mx-16 text-sm"
          >
            <AiFillThunderbolt />
            Summer sale: Up to 70% off on selected items
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default OfferBar;
