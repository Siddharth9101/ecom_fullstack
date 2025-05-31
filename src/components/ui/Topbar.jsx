import React, { useEffect, useState } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import AuthForm from "../AuthForm";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/authSlice";
import { emptyCart } from "../../store/cartSlice";
import CartItem from "./CartItem";
import toast from "react-hot-toast";
import { useDebounce } from "react-haiku";
import { fetchProducts, searchProducts } from "../../store/productsSlice";
import { useRazorpay } from "react-razorpay";
import axios from "axios";
import { CiMemoPad } from "react-icons/ci";
import Orders from "../Orders";

const Topbar = ({ isLoggedIn }) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openAuthForm, setOpenAuthForm] = useState(false);
  const [openCartSidebar, setOpenCartSidebar] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedValue = useDebounce(searchTerm, 1000);
  const [openOrdersSidebar, setOpenOrdersSidebar] = useState(false);

  const { error, isLoading, Razorpay } = useRazorpay();

  const handlePayment = ({ amount, orderId, Items, itemIds }) => {
    const itemNames = Items.join(", ");
    const options = {
      key: import.meta.env.VITE_RAZORPAY_ID,
      amount: amount * 100,
      currency: "INR",
      name: "ekat store",
      description: `Payment for ${itemNames}`,
      order_id: orderId,
      handler: (response) => {
        // save order info to backend
        try {
          axios
            .post(
              `${import.meta.env.VITE_BACKEND_BASE_URL}/orders/add-order`,
              {
                totalAmount: amount,
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
                products: itemIds,
              },
              {
                withCredentials: true,
              }
            )
            .then(() => {
              dispatch(emptyCart());
              window.location.reload();
              toast.success("Payment Successful!");
            });
        } catch (error) {
          console.log(error);
          toast.error("Payment Failed!");
        }
      },
      prefill: {
        name: "Siddharth",
        email: "siddharth@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Shipping to: XYZ Street, Delhi",
        items: itemNames,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const razorpayInstance = new Razorpay(options);
    razorpayInstance.open();
  };

  const checkout = async (amount, cartItems) => {
    try {
      let Items = [];
      cartItems.map((item) => Items.push(item.title));
      let itemIds = [];
      cartItems.map((item) => itemIds.push(item._id));
      const result = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/orders/create-order`,
        {
          amount,
        },
        {
          withCredentials: true,
        }
      );
      const { data } = result;
      handlePayment({ amount, orderId: data.id, Items, itemIds });
      if (!isLoading) dispatch(emptyCart());
      console.log(Items, itemIds);
    } catch (error) {
      console.log(error);
      toast.error("Payment Failed!");
    }
  };

  useEffect(() => {
    if (openSidebar || openAuthForm || openCartSidebar || openOrdersSidebar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openSidebar, openAuthForm, openCartSidebar, openOrdersSidebar]);

  useEffect(() => {
    if (debouncedValue === "") {
      dispatch(fetchProducts());
    } else {
      dispatch(searchProducts(debouncedValue));
    }
  }, [debouncedValue]);

  const logoutHandler = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/auth/logout`, {
        withCredentials: true,
      });
      dispatch(logoutUser());
      setOpenSidebar(false);
      toast.success("Logout successful");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong!");
    }
  };
  // if (error)
  //   return (
  //     <div className="h-screen flex justify-center items-center text-2xl">
  //       Error in payment
  //       <Link to="/" className="underline">
  //         Go back
  //       </Link>
  //     </div>
  //   );
  return (
    <div className="flex items-center justify-between py-2 px-8 bg-white">
      {/* logo/brand */}
      <div>
        <span>
          <img src="/ekart_logo.png" alt="logo" className="h-16" />
        </span>
      </div>

      {/* right side desktop */}
      <div className="md:flex gap-3 items-center hidden">
        {/* search */}
        <div>
          <input
            type="text"
            placeholder="Search..."
            className="shadow border border-gray-200 bg-gray-100 rounded py-1 px-2 outline-none"
            onChange={(e) => setSearchTerm(e.target.value)}
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
              {cartItems?.length > 0 && (
                <div className=" absolute top-1 right-1 size-4 rounded-full bg-black text-white text-sm font-semibold flex items-center justify-center">
                  {cartItems?.length}
                </div>
              )}
            </div>

            {/* my orders */}
            <div
              className="rounded-full hover:bg-gray-100 p-2 cursor-pointer relative"
              onClick={() => setOpenOrdersSidebar(true)}
            >
              <CiMemoPad className="size-6" />
            </div>

            {/* logout button */}
            <div>
              <button
                className="bg-black text-white py-1 px-3 rounded cursor-pointer hover:bg-black/85"
                onClick={logoutHandler}
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
        className={`h-full bg-black/60 fixed top-0 right-0 z-[100] overflow-hidden transition-all duration-300 ${
          openSidebar
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{
          width: openSidebar ? "100%" : "0",
        }}
      >
        <div
          className="fixed top-0 right-0 h-full w-[75%] bg-white px-2 pt-12"
          onClick={(e) => e.stopPropagation()}
        >
          {/* close button */}
          <div className="flex justify-between items-center mb-6 mr-3">
            <span className="text-4xl font-semibold">
              <img src="/ekart_logo.png" alt="logo" className="h-16" />
            </span>
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
                    onClick={() => {
                      setOpenSidebar(false);
                      setOpenCartSidebar(true);
                    }}
                  >
                    My Cart
                    <div>
                      <CiShoppingCart className="size-6" />
                    </div>
                  </div>

                  {/* my orders button */}
                  <div
                    className="flex justify-center gap-3 items-center cursor-pointer py-1 px-3 bg-black text-white rounded hover:bg-black/85"
                    onClick={() => {
                      setOpenSidebar(false);
                      setOpenOrdersSidebar(true);
                    }}
                  >
                    My Orders
                    <div>
                      <CiMemoPad className="size-6" />
                    </div>
                  </div>

                  {/* logout button */}
                  <div>
                    <button
                      className="bg-black text-white py-1 px-3 rounded cursor-pointer hover:bg-black/85 w-full"
                      onClick={() => {
                        setOpenSidebar(false);
                        logoutHandler();
                      }}
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
                      onClick={() => {
                        setOpenSidebar(false);
                        setOpenAuthForm(true);
                      }}
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
              <Link to="/new-arrivals">New Arrivals</Link>
            </li>
            <li>
              <Link to="/trending">Trends</Link>
            </li>
          </ul>
        </div>
      </aside>

      {/* Login & Signup form */}
      <div
        className={`fixed top-0 right-0 h-full bg-black/60 z-50 flex justify-end transition-all duration-300 ease-in-out overflow-hidden ${
          openAuthForm
            ? "w-full opacity-100 pointer-events-auto"
            : "w-0 opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpenAuthForm(false)}
      >
        <div
          className="w-[85%] md:w-[28%] h-full bg-white pt-8 px-8"
          onClick={(e) => e.stopPropagation()}
        >
          <AuthForm setOpenAuthForm={setOpenAuthForm} />
        </div>
      </div>

      {/* Cart Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full flex justify-end transition-all duration-300 ease-in-out overflow-hidden bg-black/60 z-50 ${
          openCartSidebar
            ? "w-full opacity-100 pointer-events-auto"
            : "w-0 opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpenCartSidebar(false)}
      >
        <div
          className="md:w-[35%] w-[85%] h-full bg-white pt-14 px-10 overflow-scroll"
          onClick={(e) => e.stopPropagation()}
        >
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
              cartItems.map((item) => (
                <React.Fragment key={item._id}>
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
                ₹{cartItems.reduce((sum, item) => sum + Number(item.price), 0)}
              </span>
            </div>
            <button
              className="w-full bg-black hover:bg-white text-white hover:text-black border border-black transition-all duration-500 ease-in-out py-2 cursor-pointer tracking-wide font-semibold "
              disabled={isLoading}
              onClick={() => {
                checkout(
                  cartItems.reduce((sum, item) => sum + Number(item.price), 0),
                  cartItems
                );
                setOpenCartSidebar(false);
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>

      {/* Orders Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full flex justify-end transition-all duration-300 ease-in-out overflow-hidden bg-black/60 z-50 ${
          openOrdersSidebar
            ? "w-full opacity-100 pointer-events-auto"
            : "w-0 opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpenOrdersSidebar(false)}
      >
        <div
          className="md:w-[35%] w-[85%] h-full bg-white pt-14 px-10 overflow-scroll"
          onClick={(e) => e.stopPropagation()}
        >
          {/* top portion */}
          <div className="flex justify-between mb-6">
            <span className="font-semibold">Orders</span>
            <div
              className="cursor-pointer"
              onClick={() => setOpenOrdersSidebar(false)}
            >
              <IoMdClose className="size-6" />
            </div>
          </div>

          <div>
            <Orders />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
