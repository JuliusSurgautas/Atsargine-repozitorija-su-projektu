import React, { Suspense, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./components/cartContext/CartContext";
import LoadingSpinner from "./components/loadingSpinner/LoadingSpinner";
import LogIn from "./components/login/LogIn";
import ScrollToTopButton from "./components/scrollToTopButton/ScrollToTopButton";
import Items from "./components/items/Items";

const Header = React.lazy(() => import("./components/header/Header"));
const Footer = React.lazy(() => import("./components/footer/Footer"));
const ProductDetail = React.lazy(() =>
  import("./components/products/ProductDetail")
);
const ScrollToTop = React.lazy(() =>
  import("./components/scrollToTop/ScrollToTop")
);
const Cart = React.lazy(() => import("./components/cart/Cart"));
const ErrorPage = React.lazy(() => import("./components/errorPage/ErrorPage"));
const Intro = React.lazy(() => import("./components/intro/Intro"));
const Checkout = React.lazy(() => import("./components/checkout/Checkout"));

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(null);

  return (
    <CartProvider>
      {showLogin && <LogIn setShowLogin={setShowLogin} setToken={setToken} />}
      <div className="app-container">
        <Suspense fallback={<LoadingSpinner />}>
          <Header setShowLogin={setShowLogin} />
          <ScrollToTop />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Intro />
                  <div className="container">
                    <Items />
                  </div>
                </>
              }
            />
            <Route
              path="/cart"
              element={
                <div className="container">
                  <Cart />
                </div>
              }
            />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/productdetail/:id" element={<ProductDetail />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
          <ScrollToTopButton />
          <Footer />
        </Suspense>
      </div>
    </CartProvider>
  );
};

export default App;
