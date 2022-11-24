import React, { useContext, useState } from "react";
import { GlobalState } from "../../../../GlobalState";

export default function SideBar() {
  const state = useContext(GlobalState);
  const [categories] = state.categoryAPI.categories;
  const [brands] = state.brandAPI.brands;
  const [products] = state.productAPI.products;
  const [category, setCategory] = state.productAPI.category;
  const [brand, setBrand] = state.productAPI.category;

  const [price, setPrice] = state.productAPI.price;
  const [level, setLevel] = state.productAPI.level;
  const [sidebar, setSideBar] = useState(false);
  // const [max, setMax] = useState(0);
  let max = 100;

  const HandleDiff = (e) => {
    if (level.includes(e.target.value)) {
      // console.log(level);
      setLevel((current) => current.filter((diff) => diff !== e.target.value));
    } else {
      setLevel((current) => [...current, e.target.value]);
      // console.log(diffFilter);
    }
  };
  const HandleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((current) =>
        current.filter((category) => category !== e.target.value)
      );
    } else {
      setCategory((current) => [...current, e.target.value]);
    }
  };
  const HandleBrand = (e) => {
    if (brand.includes(e.target.value)) {
      setBrand((current) =>
        current.filter((brand) => brand !== e.target.value)
      );
    } else {
      setBrand((current) => [...current, e.target.value]);
    }
  };
  const getBackgroundSize = () => {
    return { backgroundSize: `${(price * 100) / max}% 100% ` };
  };
  const styleSideBar = {
    left: sidebar ? 0 : "-100%",
  };
  return (
    <div className="Product_Page_SideBar">
      <h2>Products ({products.length})</h2>
      <div className="row">
        <h4>Level</h4>
        {[...Array(6)].map((e, i) => (
          <label className="form-control CheckBox" key={i}>
            <input
              type="checkbox"
              value={"level=" + (i + 5)}
              onChange={HandleDiff}
            ></input>
            Level ({i + 5})
          </label>
        ))}
      </div>
      <div className="line"></div>
      <div className="row">
        <h4>Price</h4>
        <div className="PriceSlider">
          <p>0</p>
          <input
            className="PriceRange"
            type="range"
            min="0"
            max={max}
            step={10}
            onChange={(e) => setPrice(e.target.value)}
            // ${getBackgroundSize()} `
            style={getBackgroundSize()}
            value={price}
          ></input>
          <span id="PriceFilterValue">{price}</span>
        </div>
      </div>

      <div className="line"></div>
      <div className="row">
        <h4>Category</h4>
        {categories.map((category) => (
          <label className="form-control CheckBox" key={category._id}>
            <input
              type="checkbox"
              value={"category=" + category.name}
              onChange={HandleCategory}
            ></input>
            {category.name}
          </label>
        ))}
      </div>
      <div className="line"></div>
      <div className="row">
        <h4>Brand </h4>
        {brands.map((brand) => (
          <label className="form-control CheckBox" key={brand._id}>
            <input
              type="checkbox"
              value={"brand=" + brand.name}
              onChange={HandleBrand}
            ></input>
            {brand.name}
          </label>
        ))}
      </div>
      <div className="line"></div>
    </div>
  );
}
