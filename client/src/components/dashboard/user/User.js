import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "../../../GlobalState";
import { Link } from "react-router-dom";
import { BiEdit, BiTrash } from "react-icons/bi";
import Filter from "./filter/Filter";
import axios from "axios";
import Pagination from "../../homepage/utils/pagination/Pagination";

export default function User() {
  const state = useContext(GlobalState);
  const [users, setUsers] = state.userAPI.admin_getuser;
  const [checkUsers, setCheckUsers] = useState([]);
  const [callback, setCallback] = state.userAPI.callback;
  const [token] = state.token;
  const [check, setCheck] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [UsersPerPage] = useState(9); //9 Per Page

  //Get current posts
  const indexOfLastPost = currentPage * UsersPerPage;
  const indexOfFirstPost = indexOfLastPost - UsersPerPage;
  const currentUsers = users.slice(indexOfFirstPost, indexOfLastPost);
  const howManyPages = Math.ceil(users.length / UsersPerPage);
  const deleteUser = async (user) => {
    try {
      console.log(user._id);
      await axios.delete(`/user/users/${user._id}`, {
        headers: { Authorization: token },
      });

      setCallback(!callback);
    } catch (err) {
      alert(err.reponse.data.msg);
    }
  };
  const deleteMulti = async () => {
    if (checkUsers.length > 1) {
      try {
        if (window.confirm("Delete")) {
          checkUsers.forEach((user) => {
            deleteUser(user);
          });
          setCallback(!callback);
        }
      } catch (err) {
        alert(err.reponse.data.msg);
      }
    } else alert("There is no checked user");
  };
  const CheckAll = () => {
    users.forEach(async (user) => {
      if (checkUsers.includes(user)) {
        setCheckUsers((current) =>
          current.filter((item) => item._id === user._id)
        );
      } else {
        setCheckUsers((current) => [...current, user]);
      }
      user.checked = !check;
      console.log(user);
      await axios.put(`/user/users/${user._id}`, user, {
        headers: { Authorization: token },
      });
    });

    setCheck(!check);
  };
  const ClickUdate = async (user) => {
    user.checked = !user.checked;

    if (checkUsers.includes(user)) {
      setCheckUsers((current) =>
        current.filter((product) => product._id === user._id)
      );
    } else {
      setCheckUsers((current) => [...current, user]);
    }
    await axios.put(`/user/users/${user._id}`, user, {
      headers: { Authorization: token },
    });

    //  console.log(CheckedProducts);
    setCheck(!check);
  };

  return (
    <div className="admin_user_page">
      <div className="dashboard_btn">
        <button>
          <Link to="/dashboard/user/createuser">
            <h3>Create User </h3>
          </Link>
        </button>

        <button onClick={deleteMulti}>
          <h3>Delete User </h3>
        </button>
      </div>
      <Filter />
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                className="checkall"
                onChange={CheckAll}
              ></input>
            </th>
            <th>User_id</th>
            <th>Frist Name</th>
            <th>Last Name</th>
            <th>email</th>
            <th>Role</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user._id}>
              <td>
                <input
                  type="checkbox"
                  checked={user.checked}
                  onChange={() => ClickUdate(user)}
                ></input>
              </td>
              <td>{user._id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Link to={`/dashboard/user/updateuser/${user._id}`}>
                  <BiEdit size="20px" color="green" />
                </Link>

                <button
                  onClick={() => {
                    window.confirm("Delete")
                      ? deleteUser(user)
                      : alert("notdeleted");
                  }}
                >
                  <BiTrash size="20px" color="red" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination pages={howManyPages} setCurrentPage={setCurrentPage} />
    </div>
  );
}
