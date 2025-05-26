import Banner from "./ui/Banner";
import CategoryCard from "./ui/CategoryCard";
import ProductCard from "./ui/ProductCard";
import SectionHeading from "./ui/SectionHeading";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../store/productsSlice";
import Loading from "./ui/Loading";
import Error from "./ui/Error";

const Home = () => {
  const { loadingProducts, error, allProducts } = useSelector(
    (state) => state.products
  );
  // fetching products
  const dispatch = useDispatch();
  useEffect(() => {
    if (allProducts.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loadingProducts) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  return (
    <>
      {/* Banner 1 */}
      <Banner
        bannerImg={"/banner.webp"}
        bannerTitle={"SUMMER SALE"}
        titleSide={"left"}
        bannerMobile={"/banner-mobile.webp"}
        bannerText={
          "Sizzle into savings! ☀️ Hot summer deals up to 50% off – only for a limited time!"
        }
      />
      {/* Categories cards */}
      <section className="md:p-8 p-4 grid md:grid-cols-3 md:gap-8 gap-4">
        {[
          { image: "/men-cat.jpg", heading: "Men's Wear", link: "/men" },
          { image: "/women-cat.jpg", heading: "Women's Wear", link: "/women" },
          { image: "/kids-cat.jpg", heading: "Kid's Wear", link: "/kids" },
        ].map((item, idx) => (
          <CategoryCard item={item} key={idx} />
        ))}
      </section>

      {/* New Arrivals Section */}
      <SectionHeading label={"New Arrivals"} />

      {/* New Arrival Products */}
      {
        <section className="grid md:grid-cols-4 md:gap-8 md:p-8 gap-4 p-4">
          {allProducts.length > 0 ? (
            allProducts.map((item) => (
              <ProductCard key={item._id} item={item} />
            ))
          ) : (
            <div className="text-4xl h-56 w-full flex justify-center items-center col-span-4">
              No Products Found
            </div>
          )}
        </section>
      }

      {/* Banner 2  */}
      <Banner
        bannerImg={"/banner-2.webp"}
        bannerTitle={"Sun’s Out, Deals On!"}
        titleSide={"right"}
        bannerMobile={"/banner-2-mobile.webp"}
        bannerText={
          "Catch the hottest prices of the season – shop now before they melt away!"
        }
      />

      {/* Treanding Now Section */}
      <div className="mt-8">
        <SectionHeading label={"Treanding Now"} />
      </div>

      {/* Treanding Now Products */}
      {
        <section className="grid md:grid-cols-4 md:gap-8 md:p-8 gap-4 p-4">
          {allProducts.length > 0 ? (
            allProducts.map((item) => (
              <ProductCard key={item._id} item={item} />
            ))
          ) : (
            <div className="text-4xl h-56 w-full flex justify-center items-center col-span-4">
              No products found
            </div>
          )}
        </section>
      }
    </>
  );
};

export default Home;
