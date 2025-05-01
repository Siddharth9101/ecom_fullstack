import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { setLogIn } from "../store/authSlice";

const AuthForm = ({ setOpenAuthForm }) => {
  const dispatch = useDispatch();
  const [login, setLogin] = useState(true);
  return (
    <div className="size-full">
      {login ? (
        <>
          <div>
            {/* top portion */}
            <div className="flex justify-between">
              <span className="font-semibold">Login</span>
              <div
                onClick={() => setOpenAuthForm(false)}
                className="cursor-pointer"
              >
                <IoMdClose className="size-6" />
              </div>
            </div>

            {/* login form */}

            <form
              className="mt-6 mb-4 flex flex-col gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                dispatch(setLogIn());
              }}
            >
              <InputBox label="Email Address" type="text" name="email" />
              <InputBox label="Password" type="password" name="password" />
              <Button label="Login" type="submit" accent="black" />
            </form>
            <span className="block w-full text-sm font-semibold text-center mb-4">
              or
            </span>

            <Button
              label="Create Account"
              type="button"
              accent="white"
              handler={(e) => {
                e.stopPropagation();
                setLogin(false);
              }}
            />
          </div>
        </>
      ) : (
        <>
          {/* top portion */}
          <div className="flex justify-between">
            <span className="font-semibold">Register</span>
            <div
              onClick={() => setOpenAuthForm(false)}
              className="cursor-pointer"
            >
              <IoMdClose className="size-6" />
            </div>
          </div>
          <form className="mt-6 mb-4 flex flex-col gap-4">
            <InputBox label="Full Name" type="text" name="fname" />
            <InputBox label="Email Address" type="text" name="email" />
            <InputBox label="Password" type="password" name="password" />
            <Button label="Register" type="submit" accent="black" />
          </form>
          <span className="block w-full text-sm font-semibold text-center mb-4">
            or
          </span>

          <Button
            label="Login"
            type="button"
            accent="white"
            handler={(e) => {
              e.stopPropagation();
              setLogin(true);
            }}
          />
        </>
      )}
    </div>
  );
};

export default AuthForm;

const InputBox = ({ label, type, name }) => {
  return (
    <div className="flex flex-col gap-3">
      <label htmlFor={name} className="text-sm font-semibold tracking-wide">
        {label}
        <sup className="text-red-500">*</sup>
      </label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder="Email Address"
        className="p-3 text-gray-800 text-sm border border-gray-600 tracking-wide outline-none"
      />
    </div>
  );
};

const Button = ({ label, type, accent, handler }) => {
  return (
    <button
      onClick={(e) => {
        if (handler) handler(e);
      }}
      type={type}
      className={`p-3 font-extrabold tracking-wider w-full border order-black/95 transition-all duration-400 ease-in-out cursor-pointer ${
        accent === "black"
          ? "bg-black/95 text-white/95 hover:bg-white/95 hover:text-black/95"
          : "text-black/95 hover:bg-black/95 hover:text-white/95"
      }`}
    >
      {label}
    </button>
  );
};
