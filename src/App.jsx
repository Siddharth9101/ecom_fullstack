import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import OfferBar from "./components/ui/OfferBar";
import Products from "./components/Products";

const App = () => {
  return (
    <main className="relative min-h-screen">
      <Router>
        <OfferBar />
        <Header />
        <section>
          <Routes>
            <Route path="" element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="new-arrivals" element={<Products />} />
            <Route path="trending" element={<Products />} />
          </Routes>
        </section>
        <Footer />
      </Router>
    </main>
  );
};

export default App;
