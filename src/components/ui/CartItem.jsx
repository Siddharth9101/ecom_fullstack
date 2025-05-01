import { useDispatch } from "react-redux";
import { removeFromCart } from "../../store/cartSlice";

const CartItem = ({ product }) => {
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-10">
        <div className="col-span-4">
          <img
            src={product.image}
            alt="product image"
            className="size-28 object-cover"
          />
        </div>
        <div className="col-span-6 flex flex-col justify-around items-start">
          <h4 className="tracking-wide font-bold text-sm md:text-base">
            {product.title}
          </h4>
          <span className="font-semibold text-sm block">
            Price : <span className="font-medium">{product.price}</span>
          </span>

          <button
            className="bg-red-500 text-white w-full text-sm tracking-wide rounded py-2 font-semibold hover:bg-red-400 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              dispatch(removeFromCart(product.id));
            }}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
