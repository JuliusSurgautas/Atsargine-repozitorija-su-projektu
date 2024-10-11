import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./components/cartContext/CartContext";
import React, { Suspense, useState } from "react";
import LoadingSpinner from "./components/loadingSpinner/LoadingSpinner";
import LogIn from "./components/login/LogIn";

const Header = React.lazy(() => import("./components/header/Header"));
const Footer = React.lazy(() => import("./components/footer/Footer"));
const Main = React.lazy(() => import("./components/main/Main"));
const ProductDetail = React.lazy(() =>
  import("./components/products/ProductDetail")
);
const ScrollToTop = React.lazy(() =>
  import("./components/scrollToTop/ScrollToTop")
);
const Cart = React.lazy(() => import("./components/cart/Cart"));
const ErrorPage = React.lazy(() => import("./components/errorPage/ErrorPage"));

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <CartProvider>
      {showLogin && <LogIn setShowLogin={setShowLogin} />}
      <div className="app-container">
        <Suspense fallback={<LoadingSpinner />}>
          <Header setShowLogin={setShowLogin} />
          <ScrollToTop />
          <div className="container">
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/productdetail/:id" element={<ProductDetail />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </div>
          <Footer />
        </Suspense>
      </div>
    </CartProvider>
  );
};

export default App;
