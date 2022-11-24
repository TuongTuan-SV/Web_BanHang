import React, { useContext, useState } from "react";
import { GlobalState } from "../../GlobalState";
import Menu from "./icon/menu.svg";
import Close from "./icon/xmark.svg";
import { Link, Outlet, useLocation } from "react-router-dom";
import axios from "axios";
import { MdOutlineShoppingBag } from "react-icons/md";
import { BiSearchAlt } from "react-icons/bi";
import Footer from "../footer/Footer";

export default function () {
  const state = useContext(GlobalState);
  const [Logged] = state.userAPI.Logged;
  const [IsAdmin] = state.userAPI.IsAdmin;
  const [cart] = state.userAPI.cart;
  const [search, setSearch] = state.productAPI.search;
  const [menu, setMenu] = useState(false);
  const LogoutUser = async () => {
    await axios.get("/user/logout");

    localStorage.clear();
    window.location.href = "/";
  };

  // const AdminRoute = () => {
  //   return (
  //     <>
  //       <li>
  //         <Link to="/dashboard">DashBoard</Link>
  //       </li>
  //     </>
  //   );
  // };

  const UserRoute = () => {
    return (
      <>
        <li>
          <Link to="/history">History</Link>
        </li>
        <li>
          <Link to="/" onClick={LogoutUser}>
            Logout
          </Link>
        </li>
      </>
    );
  };

  const pathName = useLocation();
  if (pathName.pathname.includes("/dashboard")) return null;
  const styleCart = {
    display: cart.length === 0 ? "none" : "block",
  };

  const toggleMenu = () => setMenu(!menu);
  const styleMenu = {
    left: menu ? 0 : "-100%",
  };
  return (
    <>
      {/*============================= Logo ========================================*/}
      <header>
        <div className="Menu" onClick={() => setMenu(!menu)}>
          <img src={Menu} alt="" width={30}></img>
        </div>

        <div className="Logo">
          <h1>
            <Link to="/">The Puzzle Shop</Link>
          </h1>
        </div>
        {/*============================= Nav ========================================*/}
        <ul style={styleMenu}>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            {/*============================= Seach Bar ========================================*/}
            <form action="/" method="get" className="SeachBar">
              <div id="header-search-bar">
                <input
                  type="text"
                  id="header-search-text"
                  placeholder="Search Here"
                  name="search"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button type="submit" id="Seachbtn">
                  <BiSearchAlt id="header-search-icon" color="blue" />
                </button>
              </div>
            </form>
          </li>

          {Logged ? (
            <UserRoute />
          ) : (
            <li>
              {" "}
              <Link to="/login">Login/Sign up</Link>{" "}
            </li>
          )}

          <li onClick={() => setMenu(!menu)}>
            <img src={Close} alt="" width={30} className="Menu"></img>
          </li>
        </ul>
        {IsAdmin ? (
          ""
        ) : (
          <div className="Cart-icon">
            <span style={styleCart}>{cart.length}</span>
            <Link to="/cart">
              <MdOutlineShoppingBag size={30}></MdOutlineShoppingBag>
              {/* <img src={Cart} alt="" width={30}></img> */}
            </Link>
          </div>
        )}
      </header>
      <div className="client_body">
        <Outlet></Outlet>
      </div>
      <Footer />
    </>
  );
}
