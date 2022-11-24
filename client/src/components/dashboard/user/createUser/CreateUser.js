import React, { useContext, useState } from "react";
import axios from "axios";
import Loading from "../../../homepage/utils/loading/Loading";
import FormData from "form-data";
import { GlobalState } from "../../../../GlobalState";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  role: "",
};

export default function CreateProduct() {
  const state = useContext(GlobalState);
  const [user, setUser] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [token] = state.token;
  const [callback, setCallback] = state.userAPI.callback;

  // const history = useNavigate()

  const CreateUser = async (e) => {
    e.preventDefault();
    try {
      console.log(user);
      await axios.post("/user/signup", { ...user });

      setUser(initialState);
      setCallback(!callback);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // const styleUpload = {
  //   display: image ? "block" : "none",
  // };

  return (
    <div className="create_product">
      <form onSubmit={CreateUser}>
        <div className="row">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            required
            value={user.firstName}
            onChange={handleChangeInput}
          ></input>
        </div>

        <div className="row">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            required
            value={user.lastName}
            onChange={handleChangeInput}
          ></input>
        </div>

        <div className="row">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            value={user.email}
            onChange={handleChangeInput}
          ></input>
        </div>

        <div className="row">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            value={user.password}
            onChange={handleChangeInput}
          ></input>
        </div>

        <div className="row">
          <label htmlFor="role">Role</label>
          <select name="role" value={user.role} onChange={handleChangeInput}>
            <option value="">Select Role</option>
            <option value={0}>0</option>
            <option value={1}>1</option>
          </select>
        </div>

        <button type="submit">Create</button>
      </form>
    </div>
  );
}
