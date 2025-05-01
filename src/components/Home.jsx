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
  const { loadingProducts, error, products } = useSelector(
    (state) => state.products
  );
  // fetching products
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

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
        bannerTitle={"COSMOPOLIS"}
        titleSide={"left"}
        bannerMobile={"/banner-mobile.webp"}
      />
      {/* Categories cards */}
      <section className="md:p-8 p-4 grid md:grid-cols-3 md:gap-8 gap-4">
        {[
          { image: "/cat1.avif", heading: "Men's Wear" },
          { image: "/cat2.avif", heading: "Women's Wear" },
          { image: "/cat3.avif", heading: "Kid's Wear" },
        ].map((item, idx) => (
          <CategoryCard item={item} key={idx} />
        ))}
      </section>

      {/* New Arrivals Section */}
      <SectionHeading label={"New Arrivals"} />

      {/* New Arrival Products */}
      {
        <section className="grid md:grid-cols-4 md:gap-8 md:p-8 gap-4 p-4">
          {products.map((item, idx) => (
            <ProductCard key={idx} item={item} />
          ))}
        </section>
      }

      {/* Banner 2  */}
      <Banner
        bannerImg={"/banner-2.webp"}
        bannerTitle={"Metropólis"}
        titleSide={"right"}
        bannerMobile={"/banner-2-mobile.webp"}
      />

      {/* Treanding Now Section */}
      <div className="mt-8">
        <SectionHeading label={"Treanding Now"} />
      </div>

      {/* Treanding Now Products */}
      {
        <section className="grid md:grid-cols-4 md:gap-8 md:p-8 gap-4 p-4">
          {products.map((item, idx) => (
            <ProductCard key={idx} item={item} />
          ))}
        </section>
      }
    </>
  );
};

export default Home;
