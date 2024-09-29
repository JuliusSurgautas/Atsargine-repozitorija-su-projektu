import { Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from "./components/cartContext/CartContext";
import React, { Suspense } from "react";

const Header = React.lazy(() => import("./components/header/Header"));
const Footer = React.lazy(() => import("./components/footer/Footer"));
const Main = React.lazy(() => import("./components/main/Main"));
const LogIn = React.lazy(() => import("./components/login/LogIn"));
const ProductDetail = React.lazy(() =>
  import("./components/products/ProductDetail")
);
const ScrollToTop = React.lazy(() =>
  import("./components/scrollToTop/ScrollToTop")
);
const Cart = React.lazy(() => import("./components/cart/Cart"));
const ErrorPage = React.lazy(() => import("./components/errorPage/ErrorPage"));

const App = () => {
  const location = useLocation();
  const hideFooter = location.pathname === "/login";

  return (
    <div className="app-container">
      <CartProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <Header />
          <ScrollToTop />
          <div className="container">
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/login" element={<LogIn />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/productdetail/:id" element={<ProductDetail />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </div>
          {!hideFooter && <Footer />}
        </Suspense>
      </CartProvider>
    </div>
  );
};

export default App;
