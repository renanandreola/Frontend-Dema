import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "../Pages/Home/Home";
import About from "../Pages/About/About";
import Register from "../Pages/Register/Register";
import ProductListing from "../Pages/ProductListing/ProductListing";
import ProductDetails from "../Pages/ProductDetails/ProductDetails";
import Login from "../Pages/Login/Login";
import Cart from "../Pages/Cart/Cart";
import Checkout from "../Pages/Checkout/Checkout";
import Confirmation from "../Pages/Confirmation/Confirmation";

function RouteComponent() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<ProductListing />} />
        <Route path="/product-details" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RouteComponent;
