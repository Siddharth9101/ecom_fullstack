import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import toast from "react-hot-toast";

const ProductCard = ({ item }) => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  return (
    <div>
      <div className="relative group">
        <img
          src={item.image}
          alt={item.title}
          className="w-full"
          loading="lazy"
        />
        {/* overlay */}
        <div className="absolute top-0 left-0 inset-0 hover:bg-black/10 transition-all duration-300 ease-in-out cursor-pointer flex items-end justify-end">
          <button
            onClick={() => {
              if (!isLoggedIn) {
                toast.error("Please login to add to cart");
                return;
              }
              dispatch(addToCart(item));
            }}
            className="md:opacity-0 md:group-hover:opacity-100 opacity-100 w-full bg-white border border-black text-black hover:bg-black hover:text-white font-bold text-sm text-center py-2  uppercase transition-all duration-300 ease-in-out cursor-pointer"
          >
            Quick Add
          </button>
        </div>
      </div>
      <div className="w-full flex flex-col items-center text-center">
        <h4 className="text-[13px] tracking-wider font-medium text-black/90 leading-6 w-[80%]">
          {item.title}
        </h4>
        <span className="mt-2 font-bold">₹{item.price}</span>
      </div>
    </div>
  );
};

export default ProductCard;
