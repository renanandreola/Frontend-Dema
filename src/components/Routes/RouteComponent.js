import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "../Pages/Home/Home";
import ProductDetails from "../Pages/ProductDetails/ProductDetails";
import Cart from "../Pages/Cart/Cart";
import Checkout from "../Pages/Checkout/Checkout";
import Confirmation from "../Pages/Confirmation/Confirmation";
import Shipping from "../Pages/Shipping/Shipping";
import LoginAdmin from "../Pages/Admin/LoginAdmin/LoginAdmin";
import HomeAdmin from "../Pages/Admin/HomeAdmin/HomeAdmin";
import SearchResults from "../Pages/SearchResults/SearchResults";

function RouteComponent() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product-details" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/loginAdmin" element={<LoginAdmin />} />
        <Route path="/homeAdmin" element={<HomeAdmin />} />
        <Route path="/searchResults" element={<SearchResults />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RouteComponent;
