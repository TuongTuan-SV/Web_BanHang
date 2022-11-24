import React from "react";
import "./admin.css";
import { Routes, Route } from "react-router-dom";
import SideBar from "./SideBar/SideBar";
import Dasboard from "./dashboard/Dashboard";
import User from "./user/User";
import CreateUser from "./user/createUser/CreateUser";
import UpdateUser from "./user/updateUser/UpdateUser";
import Product from "./product/Product";
import CreateProduct from "./product/createProduct/CreateProduct";
import Category from "./category/Category";
import Order from "./order/Order";
import OrderDetail from "./order/Orderdetail";
import Brand from "./brand/Brand";
import EditProduct from "./product/editProduct/EditProduct";
import NotFound from "../homepage/utils/NotFound";

export default function Dashboard() {
  return (
    <div className="admin_page">
      <Routes>
        <Route element={<SideBar />}>
          <Route path="/" element={<Dasboard />}></Route>
          <Route path="/user" element={<User />}></Route>
          <Route path="/user/createuser" element={<CreateUser />}></Route>
          <Route path="/user/updateuser/:id" element={<UpdateUser />}></Route>
          <Route path="/product" element={<Product />}></Route>
          <Route
            path="/product/createproduct"
            exact
            element={<CreateProduct />}
          ></Route>
          <Route
            path="/product/editproduct/:id"
            exact
            element={<EditProduct />}
          ></Route>
          <Route path="/category" exact element={<Category />}></Route>
          <Route path="/brand" exact element={<Brand />}></Route>
          <Route path="/order" exact element={<Order />}></Route>
          <Route path="/order/:id" exact element={<OrderDetail />}></Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}
