import React, { useContext } from "react";
import { GlobalState } from "../../../../GlobalState";

export default function Filter() {
  const state = useContext(GlobalState);

  const [role, setRole] = state.userAPI.role;
  const [sort, setSort] = state.userAPI.sort;
  const [search, setSearch] = state.userAPI.search;

  const handleRole = (e) => {
    setRole(e.target.value);
    setSearch("");
  };

  return (
    <div className="filter_menu">
      <div className="row">
        <span>Filters: </span>
        <select name="category" value={role} onChange={handleRole}>
          <option value="">Role</option>
          <option value={"role=0"}>0</option>
          <option value={"role=1"}>1</option>
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
