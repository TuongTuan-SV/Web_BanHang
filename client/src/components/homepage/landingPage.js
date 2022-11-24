import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./homepage/Index";
import Cart from "./cart/Cart";
import Products from "./products/Products";
import DetailProduct from "./detailproduct/DetailProduct";
import OrderHistory from "./OrderHistory/OrderHistory";
import OrderDetail from "./OrderHistory/OrderDetail";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import NotFound from "./utils/NotFound";
import Header from "../header/Header";

export default function landingPage() {
  return (
    <div className="client_page">
      <Routes>
        <Route element={<Header />}>
          <Route path="/" exact element={<Home />} />
          <Route path="/products" exact element={<Products />} />
          <Route path="/detail/:id" exact element={<DetailProduct />} />
          <Route path="/history" exact element={<OrderHistory />} />
          <Route path="/history/:id" exact element={<OrderDetail />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/signup" exact element={<SignUp />} />
          <Route path="/cart" exact element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}
