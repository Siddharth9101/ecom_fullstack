import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/authSlice";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import axios from "axios";

const AuthForm = ({ setOpenAuthForm }) => {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm();
  const [login, setLogin] = useState(true);

  const dispatch = useDispatch();
  const onSignupSubmit = async (data) => {
    const { fullname, signupEmail, signupPassword } = data;

    try {
      const result = await axios.post(
        import.meta.env.VITE_BACKEND_BASE_URL + "/signup",
        {
          fullname,
          email: signupEmail,
          password: signupPassword,
        },
        {
          withCredentials: true,
        }
      );

      dispatch(
        loginUser({
          fullname: result.data.user.fullname,
          email: result.data.user.email,
          cartItems: [],
        })
      );

      setOpenAuthForm(false);
      reset();
      toast.success("Signup successful");
    } catch (error) {
      console.log(error);
      setOpenAuthForm(false);
      reset();
      toast.error(error?.response?.data?.message);
    }
  };

  const onLoginSubmit = async (data) => {
    const { loginEmail, loginPassword } = data;

    try {
      const result = await axios.post(
        import.meta.env.VITE_BACKEND_BASE_URL + "/login",
        {
          email: loginEmail,
          password: loginPassword,
        },
        {
          withCredentials: true,
        }
      );

      dispatch(
        loginUser({
          fullname: result.data.user.fullname,
          email: result.data.user.email,
          cartItems: [],
        })
      );

      setOpenAuthForm(false);
      reset();
      toast.success("Login successful");
    } catch (error) {
      console.log(error);
      setOpenAuthForm(false);
      reset();
      toast.error(error?.response?.data?.message);
    }
  };
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
              onSubmit={handleSubmit(onLoginSubmit)}
            >
              {/* login email */}
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="loginEmail"
                  className="text-sm font-semibold tracking-wide"
                >
                  Email Address
                  <sup className="text-red-500">*</sup>
                </label>
                <input
                  type="email"
                  id="loginEmail"
                  name="loginEmail"
                  placeholder="example@gmail.com"
                  className="p-3 text-gray-800 text-sm border border-gray-600 tracking-wide outline-none"
                  {...register("loginEmail", { required: true })}
                />
                {errors.loginEmail && (
                  <span className="text-red-500 text-xs font-semibold tracking-wide">
                    This field is required
                  </span>
                )}
              </div>
              {/* login password */}
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="loginPassword"
                  className="text-sm font-semibold tracking-wide"
                >
                  Password
                  <sup className="text-red-500">*</sup>
                </label>
                <input
                  type="password"
                  id="loginPassword"
                  name="loginPassword"
                  placeholder="********"
                  className="p-3 text-gray-800 text-sm border border-gray-600 tracking-wide outline-none"
                  {...register("loginPassword", { required: true })}
                />
                {errors.loginPassword && (
                  <span className="text-red-500 text-xs font-semibold tracking-wide">
                    This field is required
                  </span>
                )}
              </div>
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
          {/* signup form*/}
          <form
            className="mt-6 mb-4 flex flex-col gap-4"
            onSubmit={handleSubmit(onSignupSubmit)}
          >
            {/* fullname */}
            <div className="flex flex-col gap-3">
              <label
                htmlFor="signupEmail"
                className="text-sm font-semibold tracking-wide"
              >
                Full Name
                <sup className="text-red-500">*</sup>
              </label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                placeholder="John Doe"
                className="p-3 text-gray-800 text-sm border border-gray-600 tracking-wide outline-none"
                {...register("fullname", { required: true })}
              />
              {errors.fullname && (
                <span className="text-red-500 text-xs font-semibold tracking-wide">
                  This field is required
                </span>
              )}
            </div>
            {/* signup email */}
            <div className="flex flex-col gap-3">
              <label
                htmlFor="signupEmail"
                className="text-sm font-semibold tracking-wide"
              >
                Email Address
                <sup className="text-red-500">*</sup>
              </label>
              <input
                type="email"
                id="signupEmail"
                name="signupEmail"
                placeholder="example2gmail.com"
                className="p-3 text-gray-800 text-sm border border-gray-600 tracking-wide outline-none"
                {...register("signupEmail", { required: true })}
              />
              {errors.signupEmail && (
                <span className="text-red-500 text-xs font-semibold tracking-wide">
                  This field is required
                </span>
              )}
            </div>
            {/* signup password */}
            <div className="flex flex-col gap-3">
              <label
                htmlFor="signupPassword"
                className="text-sm font-semibold tracking-wide"
              >
                Password
                <sup className="text-red-500">*</sup>
              </label>
              <input
                type="password"
                id="signupPassword"
                name="signupPassword"
                placeholder="********"
                className="p-3 text-gray-800 text-sm border border-gray-600 tracking-wide outline-none"
                {...register("signupPassword", { required: true })}
              />
              {errors.signupPassword && (
                <span className="text-red-500 text-xs font-semibold tracking-wide">
                  This field is required
                </span>
              )}
            </div>
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
