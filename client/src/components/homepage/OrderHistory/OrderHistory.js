import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "../../../GlobalState";
import { Link } from "react-router-dom";
import axios from "axios";

export default function OrderHistory() {
  const state = useContext(GlobalState);
  const [history, setHistory] = state.userAPI.history;

  const [token] = state.token;
  console.log(history);

  useEffect(() => {
    if (token) {
      const getHistory = async () => {
        const res = await axios.get("/user/history", {
          headers: { Authorization: token },
        });
        setHistory(res.data);
      };
      getHistory();
    }
  }, [token, setHistory]);

  return (
    <div className="History_Page">
      <h2>History</h2>
      <h4>You have {history.length} Orders</h4>

      <table>
        <thead>
          <tr>
            <th>Payment ID</th>
            <th>Date of purchased</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {history.reverse().map((item) => {
            return (
              <tr key={item._id}>
                <td>{item.paymentID}</td>
                <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                <td>
                  {item.total.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </td>
                <td>
                  <Link to={`/history/${item._id}`}>View</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
