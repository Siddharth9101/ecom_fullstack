import React from "react";
import { Link } from "react-router-dom";
import { CiCircleChevUp } from "react-icons/ci";

const Footer = () => {
  return (
    <div className="bg-black text-white/90 pt-24 relative">
      <div className="grid grid-cols-2 px-8 py-3">
        {/* left side */}
        <div className="flex flex-col gap-10 justify-center items-center">
          <span className="text-6xl font-bold cursor-pointer">ekart</span>
          <p className="text-center w-[75%] hidden md:block">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga
            reiciendis placeat inventore quos ducimus id?
          </p>
        </div>
        {/* right side */}
        <div className="flex justify-center items-center">
          <ul className="space-y-6 text-lg font-semibold">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:underline">
                Products
              </Link>
            </li>
            <li>
              <Link to="/categories" className="hover:underline">
                Category
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:underline">
                Trends
              </Link>
            </li>
          </ul>
        </div>
        {/* back to top button */}
        <div
          className="absolute top-0 left-[50%]"
          style={{ transform: "translateX(-50%)" }}
        >
          <a
            href="#top"
            className="cursor-pointer rounded-full p-2 hover:scale-110"
          >
            <CiCircleChevUp className="size-10" />
          </a>
        </div>
      </div>

      {/* bottom bar */}
      <div className="pt-16 text-center">
        <span className="md:text-sm text-lg text-white/90">
          &copy; 2025. All rights reserved. Made by Siddharth😁
        </span>
      </div>
    </div>
  );
};

export default Footer;
