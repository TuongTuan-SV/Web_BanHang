import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: 0,
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/user/signup", { ...user });
      console.log(res);
      localStorage.setItem("firstLogin", true);

      window.location.href = "/";
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div className="login_page">
      <form onSubmit={registerSubmit}>
        <h2>Sign up</h2>
        <input
          type="text"
          name="firstName"
          required
          placeholder="First Name"
          value={user.firstName}
          onChange={onChangeInput}
        />

        <input
          type="text"
          name="lastName"
          required
          placeholder="Last Name"
          value={user.lastName}
          onChange={onChangeInput}
        />

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
          <button type="submit">Sign Up</button>
          <Link to="/login">Log in</Link>
        </div>
      </form>
    </div>
  );
}
