import { lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
const Home = lazy(() => import("./components/Home"));
const Products = lazy(() => import("./components/Products"));
const UserLayout = lazy(() => import("./components/layouts/UserLayout"));

const App = () => {
  return (
    <main className="relative min-h-screen">
      <Router>
        <section>
          <Routes>
            <Route path="/" element={<UserLayout />}>
              <Route index element={<Home />} />
              <Route
                path="products"
                element={<Products pageLabel={"All Products"} />}
              />
              <Route
                path="new-arrivals"
                element={<Products pageLabel={"New Arrivals"} />}
              />
              <Route
                path="trending"
                element={<Products pageLabel={"Trending"} />}
              />
              <Route
                path="men"
                element={<Products pageLabel={"Men's Wear"} />}
              />
              <Route
                path="women"
                element={<Products pageLabel={"Women's Wear"} />}
              />
              <Route
                path="kids"
                element={<Products pageLabel={"Kid's Wear"} />}
              />
            </Route>
          </Routes>
        </section>
      </Router>
    </main>
  );
};

export default App;
