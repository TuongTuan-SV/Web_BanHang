import React, { useContext, useEffect, useState } from "react";
import Carousel from "./Carousel/Carousel";
import { GlobalState } from "../../../GlobalState";
import ProductItem from "../utils/productitem/ProductItem";
export default function Index() {
  const state = useContext(GlobalState);
  const [products] = state.productAPI.products;
  const [newproducts] = state.productAPI.newproducts;
  const [hotProduct] = state.productAPI.hotproducts;
  const [images, setImages] = useState([]);

  useEffect(() => {
    products.forEach((product) => {
      setImages((images) => [
        ...images,
        {
          src: product.image.url,
          title: product.image.title,
          link: product._id,
        },
      ]);
    });
  }, [products]);

  return (
    <div className="home_page">
      <Carousel images={images} />
      <h2 className="trending">New Product</h2>
      <div className="Products">
        {newproducts.map((product) => (
          <ProductItem key={product._id} product={product} />
        ))}
      </div>
      <h2 className="trending">Today's Popular Items</h2>
      <div className="Products">
        {hotProduct.map((product) => (
          <ProductItem key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
