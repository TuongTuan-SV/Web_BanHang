import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../../../GlobalState";

export default function ({ product }) {
  const state = useContext(GlobalState);
  const addCart = state.userAPI.addCart;

  // console.log(product.image.url)
  return (
    <div className="Product_card">
      <div className="Card_level" id={`LV${product.level}`}>
        <span className="Card_level_level">
          {product.level != null ? "Level" : ""}
        </span>
        <span className="Card_level_number">{product.level}</span>
      </div>
      <img src={product.image.url} alt="" />

      <div className="product_box">
        <h2 title={product.title}>{product.title}</h2>
        <span>
          {product.price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </span>
        <p>{product.category}</p>
      </div>

      <div className="row_btn">
        <Link id="btn_buy" to="#!" onClick={() => addCart(product)}>
          Buy
        </Link>
        <Link id="btn_view" to={`/detail/${product._id}`}>
          View
        </Link>
      </div>
    </div>
  );
}
