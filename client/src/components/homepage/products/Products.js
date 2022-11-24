import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "../../../GlobalState";
import ProductItem from "../utils/productitem/ProductItem";
import Loading from "../utils/loading/Loading";
import SideBar from "./SideBar/SideBar";
import Pagination from "../utils/pagination/Pagination";

export default function Products() {
  const state = useContext(GlobalState);
  const [products] = state.productAPI.products;

  const [sort, setSort] = state.productAPI.sort;
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9); //9 Per Page
  //Get current posts
  const indexOfLastPost = currentPage * productsPerPage;
  const indexOfFirstPost = indexOfLastPost - productsPerPage;

  const currentProducts = products.slice(indexOfFirstPost, indexOfLastPost);
  console.log(indexOfLastPost, indexOfFirstPost, currentProducts);
  const howManyPages = Math.ceil(products.length / productsPerPage);
  // const [callback, setCallback] = state.productAPI.callback;
  //   const price = products.map((product) => {
  //     return product.price;
  //   });
  //   console.log(price);

  //   console.log(products);
  // useEffect(() => {}, [products]);
  return (
    <div>
      <div className="Product_Page">
        <SideBar></SideBar>
        <div style={{ width: "100%", position: "relative" }}>
          <div className="row sort">
            <span>Sort By: </span>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="">Newest</option>
              <option value="sort=oldest">Oldest</option>
              <option value="sort=-sold">Best sales</option>
              <option value="sort=-price">Price: Hight-Low</option>
              <option value="sort=price">Price: Low-Hight</option>
            </select>
          </div>
          <div className="Products">
            {currentProducts.map((product) => {
              return <ProductItem key={product._id} product={product} />;
            })}
          </div>
          {products.length === 0 && <Loading />}
        </div>
      </div>
      <Pagination pages={howManyPages} setCurrentPage={setCurrentPage} />
    </div>
  );
}
