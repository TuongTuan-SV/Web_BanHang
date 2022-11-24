import React, { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";
import ProductItem from "../utils/productitem/ProductItem";

export default function DetailProduct() {
  const parmas = useParams();
  const state = useContext(GlobalState);
  const addcart = state.userAPI.addCart;
  const [products] = state.productAPI.products;

  const [detailProduct, setDetailProduct] = useState([]);
  useEffect(() => {
    if (parmas.id) {
      products.forEach((product) => {
        if (product._id === parmas.id) setDetailProduct(product);
      });
    }
  }, [parmas.id, products]);

  if (detailProduct.length === 0) return null;
  console.log(detailProduct);
  return (
    <>
      <div className="DetailProduct">
        <img src={detailProduct.image.url} alt=" "></img>
        <div className="box_detail">
          <div className="row">
            <h2>{detailProduct.title}</h2>
          </div>
          <div className="detail_content">
            <p style={{ width: "40%" }}>Price </p>
            <p style={{ width: "60%" }}>
              {detailProduct.price.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </p>
          </div>
          <div className="detail_content">
            <p style={{ width: "40%" }}>Brand</p>
            <p style={{ width: "60%" }}>{detailProduct.brand}</p>
          </div>
          <div className="detail_content">
            <p style={{ width: "40%" }}>Difficulty</p>
            <p style={{ width: "60%" }}>{detailProduct.level}</p>
          </div>
          <div className="detail_content">
            <p style={{ width: "40%" }}>Dimensions</p>
            <p style={{ width: "60%" }}> {detailProduct.dimensions}</p>
          </div>
          <div className="detail_content">
            <p style={{ width: "40%" }}>Sold</p>
            <p style={{ width: "60%" }}>{detailProduct.sold}</p>
          </div>
          <Link
            to="/cart"
            className="cart"
            onClick={() => addcart(detailProduct)}
          >
            Buy Now
          </Link>
        </div>
      </div>
      <div className="detail_description">
        <h2>Description</h2>
        <div className="detail_description_content">
          <pre>{detailProduct.description}</pre>
        </div>
      </div>
      <div className="related_product">
        <h2>Related Product</h2>
        <div className="products">
          {products.map((product) => {
            return product.category === detailProduct.category &&
              product._id !== detailProduct._id ? (
              <ProductItem key={product._id} product={product} />
            ) : null;
          })}
        </div>
      </div>
    </>
  );
}
