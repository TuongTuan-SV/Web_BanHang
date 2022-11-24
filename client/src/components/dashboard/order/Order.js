import React, { useContext, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Order() {
  const state = useContext(GlobalState);
  const [history, setHistory] = state.userAPI.history;
  const [IsAdmin] = state.userAPI.IsAdmin;
  const [token] = state.token;

  useEffect(() => {
    if (token) {
      const getHistory = async () => {
        try {
          if (IsAdmin) {
            const res = await axios.get("/api/payment", {
              headers: { Authorization: token },
            });
            setHistory(res.data);
          } else {
            const res = await axios.get("/user/history", {
              headers: { Authorization: token },
            });
            setHistory(res.data);
          }

          // console.log(res,history)
        } catch (err) {
          alert(err.response.data.msg);
        }
      };

      getHistory();
    }
  }, [token, IsAdmin]);

  return (
    <div className="admin_order">
      <h2>History</h2>
      <h4>You have {history.length} Orders</h4>

      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Payment ID</th>
            <th>Date of purchased</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {history.reverse().map((item) => {
            return (
              <tr key={item._id}>
                <td>{item.user_id}</td>
                <td>{item.paymentID}</td>
                <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                <td>
                  <Link to={`/dashboard/order/${item._id}`}>View</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
