import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../../homepage/utils/loading/Loading";
import FormData from "form-data";
import { GlobalState } from "../../../../GlobalState";
import { useNavigate, useParams } from "react-router-dom";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  role: "",
};

export default function UpdateUser() {
  const state = useContext(GlobalState);
  const [user, setUser] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [token] = state.token;
  const [callback, setCallback] = state.userAPI.callback;
  const [users, setUsers] = state.userAPI.admin_getuser;
  const [onEdit, setOnEdit] = useState(false);

  // const history = useNavigate()
  const parmas = useParams();
  useEffect(() => {
    if (parmas.id) {
      setOnEdit(true);
      users.forEach((user) => {
        if (user._id === parmas.id) {
          setUser(user);
          console.log(user);
        }
      });
    } else {
      setOnEdit(false);
      setUser(initialState);
    }
  }, [parmas.id, users]);

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      if (onEdit) {
        await axios.put(`/user/users/${user._id}`, { ...user });
      }

      setUser(initialState);
      setOnEdit(false);
      setCallback(!callback);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    console.log(user);
  };

  return (
    <div className="create_product">
      <form onSubmit={updateUser}>
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

        <button type="submit">Update</button>
      </form>
    </div>
  );
}
