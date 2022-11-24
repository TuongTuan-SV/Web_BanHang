import React, { useContext } from "react";
import { useEffect } from "react";
import { GlobalState } from "../../../../GlobalState";

export default function Filter() {
  const state = useContext(GlobalState);
  const [categories] = state.categoryAPI.categories;

  const [category, setCategory] = state.productAPI.category;
  const [sort, setSort] = state.productAPI.sort;
  const [search, setSearch] = state.productAPI.search;
  const [callback, setCallback] = state.productAPI.callback;
  useEffect(() => {
    setCategory("");
  }, [setCategory]);
  const handleCategory = (e) => {
    setCategory(e.target.value);
    setSearch("");
    setCallback(!callback);
  };

  return (
    <div className="filter_menu">
      <div className="row">
        <span>Filters: </span>
        <select name="category" value={category} onChange={handleCategory}>
          <option value="">All Products</option>
          {categories.map((category) => (
            <option value={"category=" + category.name} key={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <input
        type="text"
        value={search}
        placeholder="Enter your search!"
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
      />

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
    </div>
  );
}
