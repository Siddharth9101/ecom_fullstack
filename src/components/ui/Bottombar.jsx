import React from "react";
import { Link } from "react-router-dom";

const Bottombar = () => {
  return (
    <div className="bg-black py-2 px-8 md:block hidden">
      <ul className="text-white font-bold uppercase flex gap-10">
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
  );
};

export default Bottombar;
