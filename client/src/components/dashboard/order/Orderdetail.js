import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";

export default function OrderDetail() {
  const state = useContext(GlobalState);
  const [history] = state.userAPI.history;
  const [OrderDetail, setOrderDetail] = useState([]);

  const parmas = useParams();

  useEffect(() => {
    if (parmas.id) {
      history.forEach((item) => {
        if (item._id === parmas.id) setOrderDetail(item);
      });
    }
  }, [parmas.id, history]);

  console.log(OrderDetail);

  if (OrderDetail.length === 0) return null;
  return (
    <div className="admin_order">
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {OrderDetail.cart.map((item) => (
            <tr key={item._id}>
              <td>
                <img src={item.image.url} alt=" " />
              </td>
              <td>{item.title}</td>
              <td>{item.quantity}</td>
              <td>
                {(item.price * item.quantity).toLocaleString("us-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
