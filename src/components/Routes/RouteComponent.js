import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "../Pages/Home/Home";
import About from "../Pages/About/About";
import ProductListing from "../Pages/ProductListing/ProductListing";
import ProductDetails from "../Pages/ProductDetails/ProductDetails";
import Login from "../Pages/Login/Login";
import Cart from "../Pages/Cart/Cart";
import Checkout from "../Pages/Checkout/Checkout";
import Confirmation from "../Pages/Confirmation/Confirmation";
import Shipping from "../Pages/Shipping/Shipping";
import AddProduct from "../Pages/AddProduct/AddProduct";

function RouteComponent() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<ProductListing />} />
        <Route path="/product-details" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/addProduct" element={<AddProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RouteComponent;
