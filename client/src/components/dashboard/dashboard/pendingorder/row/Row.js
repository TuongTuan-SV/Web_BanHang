import React from "react";

export default function Row({ order_day, amount, total, order_by }) {
  return (
    <div className="container">
      {console.log(order_day, order_by, amount, total)}
      <div className="left">
        <div className="order_day">{order_day}</div>
        <div className="order_by">
          <span>
            by {order_by},{amount} items
          </span>
        </div>
      </div>
      <div className="right">
        <span className="total">
          {total.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </span>
      </div>
    </div>
  );
}
