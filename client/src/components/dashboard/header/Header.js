import React, { useState, useContext, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import Menu from "../../header/icon/menu.svg";
import { Link, Outlet, useLocation } from "react-router-dom";
import axios from "axios";
import { MdOutlineShoppingBag } from "react-icons/md";
import { BiSearchAlt } from "react-icons/bi";

export default function () {
  const state = useContext(GlobalState);
  const [Logged] = state.userAPI.Logged;
  const [IsAdmin] = state.userAPI.IsAdmin;
  const [cart] = state.userAPI.cart;
  const [search, setSearch] = state.productAPI.search;
  const LogoutUser = async () => {
    await axios.get("/user/logout");

    localStorage.clear();
    window.location.href = "/";
  };

  const AdminRoute = () => {
    return (
      <>
        <li>
          <Link to="/dashboard">DashBoard</Link>
        </li>
        {/* <li>
          <Link to="/create_product">Create Product</Link>
        </li>
        <li>
          <Link to="/category">Category</Link>
        </li> */}
      </>
    );
  };
  return (
    <>
      {/*============================= Logo ========================================*/}
      <header>
        <div className="Menu">
          <img src={Menu} alt="" width={30}></img>
        </div>

        <div className="Logo">
          <h1>
            <Link to="/">Admin</Link>
          </h1>
        </div>
        {/*============================= Nav ========================================*/}
        <ul>
          {/* <li>
            <Link to="/products">Products</Link>
          </li> */}
          <li>
            {/*============================= Seach Bar ========================================*/}
            {/* <form action="/" method="get" className="SeachBar">
              <div id="header-search-bar">
                <input
                  type="text"
                  id="header-search-text"
                  placeholder="Search Here"
                  name="s"
                  onChange={(e) => setSearch(e.target.value.toLowerCase())}
                />
                <button type="submit" id="Seachbtn">
                  <BiSearchAlt id="header-search-icon" color="blue" />
                </button>
              </div>
            </form> */}
          </li>
          {IsAdmin && <AdminRoute />}
        </ul>
      </header>
    </>
  );
}
