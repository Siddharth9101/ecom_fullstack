import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Products from "./components/Products";
import UserLayout from "./components/layouts/UserLayout";
import AdminLayout from "./components/layouts/AdminLayout";
import AdminProducts from "./components/AdminProducts";
import AdminDashboard from "./components/AdminDashboard";

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
              {/* Admin Routes */}
              <Route path="admin" element={<AdminLayout />}>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route index element={<div />} />
              </Route>
            </Route>
          </Routes>
        </section>
      </Router>
    </main>
  );
};

export default App;
