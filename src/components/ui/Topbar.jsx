import React, { useEffect, useState } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import AuthForm from "../AuthForm";
import { useDispatch, useSelector } from "react-redux";
import { setLogOut } from "../../store/authSlice";
import CartItem from "./CartItem";

const Topbar = ({ isLoggedIn }) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openAuthForm, setOpenAuthForm] = useState(false);
  const [openCartSidebar, setOpenCartSidebar] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    document.body.style.overflow =
      openAuthForm || openSidebar ? "hidden" : "auto";
  }, [, openSidebar, openAuthForm]);
  return (
    <div className="flex items-center justify-between py-2 px-8">
      {/* logo/brand */}
      <div>
        <span className="text-4xl font-bold">ecom</span>
      </div>

      {/* right side desktop */}
      <div className="md:flex gap-3 items-center hidden">
        {/* search */}
        <div>
          <input
            type="text"
            placeholder="Search..."
            className="shadow border border-gray-200 bg-gray-100 rounded py-1 px-2 outline-none"
          />
        </div>
        {isLoggedIn ? (
          <>
            {/* cart button */}
            <div
              className="rounded-full hover:bg-gray-100 p-2 cursor-pointer relative"
              onClick={() => setOpenCartSidebar(true)}
            >
              <CiShoppingCart className="size-6" />
              {/* cart badge */}
              {cartItems.length > 0 && (
                <div className=" absolute top-1 right-1 size-4 rounded-full bg-black text-white text-sm font-semibold flex items-center justify-center">
                  {cartItems.length}
                </div>
              )}
            </div>

            {/* logout button */}
            <div>
              <button
                className="bg-black text-white py-1 px-3 rounded cursor-pointer hover:bg-black/85"
                onClick={() => dispatch(setLogOut())}
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <>
            {/* login button */}
            <div>
              <button
                className="bg-black text-white py-1 px-3 rounded cursor-pointer hover:bg-black/85"
                onClick={() => {
                  setOpenAuthForm(true);
                }}
              >
                Login
              </button>
            </div>
          </>
        )}
      </div>

      {/* right side mobile */}
      {/* hamburger menu */}
      <div className="block md:hidden" onClick={() => setOpenSidebar(true)}>
        <FaBars />
      </div>

      {/* sidebar mobile */}
      <aside
        onClick={() => setOpenSidebar(false)}
        className={`h-full bg-black/60 absolute top-0 right-0 z-10 overflow-hidden transition-all duration-300 ${
          openSidebar
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{
          width: openSidebar ? "100%" : "0",
        }}
      >
        <div className="absolute top-0 right-0 h-full w-[75%] bg-white px-2 pt-12 ">
          {/* close button */}
          <div className="flex justify-between items-center mb-6 ml-6">
            <span className="text-4xl font-semibold">ecom</span>
            <button onClick={() => setOpenSidebar(false)}>
              <IoMdClose className="size-6" />
            </button>
          </div>
          {/* Search */}
          <div className="flex flex-col justify-center gap-5">
            <input
              type="text"
              placeholder="Search..."
              className="w-full shadow border border-gray-200 bg-gray-100 rounded py-1 px-1 outline-none"
            />
            <div className="flex flex-col gap-3">
              {isLoggedIn ? (
                <>
                  {/* cart button */}
                  <div
                    className="flex justify-center gap-3 items-center cursor-pointer py-1 px-3 bg-black text-white rounded hover:bg-black/85"
                    onClick={() => setOpenCartSidebar(true)}
                  >
                    Your Cart
                    <div>
                      <CiShoppingCart className="size-6" />
                    </div>
                  </div>

                  {/* logout button */}
                  <div>
                    <button
                      className="bg-black text-white py-1 px-3 rounded cursor-pointer hover:bg-black/85 w-full"
                      onClick={() => dispatch(setLogOut())}
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* login button */}
                  <div>
                    <button
                      className="bg-black text-white py-1 px-3 rounded cursor-pointer hover:bg-black/85 w-full"
                      onClick={() => setOpenAuthForm(true)}
                    >
                      Login
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          <ul className="w-full text-lg uppercase pl-2 space-y-3 mt-3">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/categories">Category</Link>
            </li>
            <li>
              <Link to="/categories">Trends</Link>
            </li>
          </ul>
        </div>
      </aside>

      {/* Login & Signup form */}
      <div
        className={`absolute top-0 right-0 h-full bg-black/60 z-50 flex justify-end transition-all duration-300 ease-in-out overflow-hidden ${
          openAuthForm
            ? "w-full opacity-100 pointer-events-auto"
            : "w-0 opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpenAuthForm(false)}
      >
        <div className="w-[85%] md:w-[28%] h-full bg-white pt-8 px-8">
          <AuthForm setOpenAuthForm={setOpenAuthForm} />
        </div>
      </div>

      {/* Cart Sidebar */}
      <div
        className={`absolute top-0 right-0 h-full flex justify-end transition-all duration-300 ease-in-out overflow-hidden bg-black/60 z-50 ${
          openCartSidebar
            ? "w-full opacity-100 pointer-events-auto"
            : "w-0 opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpenCartSidebar(false)}
      >
        <div className="md:w-[35%] w-[85%] h-full bg-white pt-14 px-10">
          {/* top portion */}
          <div className="flex justify-between mb-6">
            <span className="font-semibold">Cart</span>
            <div
              className="cursor-pointer"
              onClick={() => setOpenCartSidebar(false)}
            >
              <IoMdClose className="size-6" />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {/* cart items */}
            {cartItems.length > 0 ? (
              cartItems.map((item, idx) => (
                <React.Fragment key={idx}>
                  <CartItem product={item} />
                </React.Fragment>
              ))
            ) : (
              <div>
                <span className="block w-full text-sm tracking-wide font-semibold text-center text-gray-600">
                  No items found
                </span>
              </div>
            )}

            <div className="py-2 px-4 flex justify-between items-center">
              <span className="font-semibold">Total</span>
              <span>
                ${cartItems.reduce((sum, item) => sum + Number(item.price), 0)}
              </span>
            </div>
            <button className="w-full bg-black hover:bg-white text-white hover:text-black border border-black transition-all duration-500 ease-in-out py-2 cursor-pointer tracking-wide font-semibold ">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
