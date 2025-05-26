import React, { useEffect, useState } from "react";
import FiltersSidebar from "./ui/FiltersSidebar";
import ProductCard from "./ui/ProductCard";
import { FaFilter } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/productsSlice";
import Loading from "./ui/Loading";
import Error from "./ui/Error";

const Products = ({ pageLabel }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { loadingProducts, products, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pageLabel]);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  if (loadingProducts) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  return (
    <section className="grid grid-cols-12 md:mt-14 mt-6">
      {/* left side hidden on mobile visible on desktop*/}
      <div className="hidden md:block col-span-3 pl-6 pr-3">
        <FiltersSidebar />
      </div>
      {/* right side */}
      <div className="col-span-12 mx-6 md:col-span-9">
        <div
          className="w-full flex gap-1 my-3 pl-3 cursor-pointer md:hidden"
          onClick={() => setOpen(true)}
        >
          <FaFilter className="size-6" />
          <span className="text-sm">Filters</span>
        </div>
        <h1 className="text-4xl font-semibold italic tracking-wider my-6 px-6 md:px-0">
          {pageLabel}
        </h1>
        {
          <div className="grid md:grid-cols-3 grid-cols-2 gap-6 px-4 md:px-0">
            {pageLabel === "Men's Wear" ||
            pageLabel === "Women's Wear" ||
            pageLabel === "Kid's Wear"
              ? products
                  .filter(
                    (item) =>
                      item.category.toLowerCase() === pageLabel.toLowerCase()
                  )
                  .map((item) => <ProductCard key={item._id} item={item} />)
              : products.map((item) => (
                  <ProductCard key={item._id} item={item} />
                ))}
          </div>
        }
      </div>

      {/* sidebar mobile */}
      <aside
        className="absolute top-0 left-0 h-full bg-black/60 z-50 overflow-hidden transition-all duration-300 ease-in-out"
        style={
          open
            ? { width: "100%", opacity: "100%" }
            : { width: "0", opacity: "0" }
        }
        onClick={() => setOpen(false)}
      >
        <div className="w-[75%] h-full bg-white pt-14 px-6">
          <div className="w-full flex items-center justify-between mb-3">
            <span className="text-lg font-semibold tracking-wide">Filters</span>
            {/* filter button */}
            <button onClick={() => setOpen(false)}>
              <IoMdClose className="size-6" />
            </button>
            {/* filters component */}
          </div>
          <FiltersSidebar />
        </div>
      </aside>
    </section>
  );
};

export default Products;
