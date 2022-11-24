import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { GlobalState } from "../../../../GlobalState";
import Row from "./row/Row";

export default function PendingOrders() {
  const state = useContext(GlobalState);
  const [history, setHistory] = useState([]);
  const [token] = state.token;
  const [IsAdmin] = state.userAPI.IsAdmin;
  useEffect(() => {
    if (token) {
      const getHistory = async () => {
        try {
          const res = await axios.get("/api/payment", {
            headers: { Authorization: token },
          });
          setHistory(res.data);
          // console.log(res,history)
        } catch (err) {
          alert(err.response.data.msg);
        }
      };

      getHistory();
    }
  }, [token, IsAdmin]);
  return (
    <div className="PendingOrder">
      <h2>PendingOrders</h2>
      {history.reverse().map((item) => (
        <Row
          order_day={new Date(item.createdAt).toLocaleDateString()}
          order_by={item.User_name}
          amount={item.cart.length}
          total={item.total}
          key={item._id}
        ></Row>
      ))}
    </div>
  );
}
