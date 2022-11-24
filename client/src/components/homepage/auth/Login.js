import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { GlobalState } from "../../../GlobalState";

export default function Login() {
  const pathName = useLocation();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/user/login", { ...user });
      console.log(res);
      if (res.data.user.role === 0) {
        localStorage.setItem("firstLogin", true);
        window.location.href = "/";
      } else {
        localStorage.setItem("admin", true);
        window.location.href = "/";
        if (pathName.pathname.includes("/dashboard"))
          window.location.href = "/dashboard";
        else window.open("http://localhost:3000/dashboard", "_blank");
        // window.location.href = "/dashboard"
      }
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div className="login_page">
      <form onSubmit={loginSubmit}>
        <h2>Login</h2>
        <input
          type="email"
          name="email"
          required
          placeholder="Email"
          value={user.email}
          onChange={onChangeInput}
        />

        <input
          type="password"
          name="password"
          required
          autoComplete="on"
          placeholder="Password"
          value={user.password}
          onChange={onChangeInput}
        />
        <div className="row">
          <button type="submit">Login</button>
          <Link to="/signup">Sign up</Link>
        </div>
      </form>
    </div>
  );
}
