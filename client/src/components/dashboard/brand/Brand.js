import React, { useContext, useState } from "react";
import { GlobalState } from "../../../GlobalState";
import axios from "axios";

export default function Brand() {
  const state = useContext(GlobalState);
  const [brands] = state.brandAPI.brands;
  const [brand, setBrand] = useState("");
  const [token] = state.token;
  const [callback, setCallback] = state.brandAPI.callback;
  const [onEdit, setOnedit] = useState(false);
  const [id, setId] = useState("");

  const createBrand = async (e) => {
    e.preventDefault();
    try {
      if (onEdit) {
        const res = await axios.put(
          `/api/brand/${id}`,
          { name: brand },
          {
            headers: { Authorization: token },
          }
        );
        console.log(res);
      } else {
        const res = await axios.post(
          "/api/brand",
          { name: brand },
          {
            headers: { Authorization: token },
          }
        );
        console.log(res);
      }
      setOnedit(false);
      setBrand("");
      setCallback(!callback);
    } catch (err) {
      console.log(err);
      alert(err.response.data.msg);
    }
  };

  const editBrand = async (id, name) => {
    setId(id);
    setBrand(name);
    setOnedit(true);
  };

  const deleteBrand = async (id) => {
    try {
      await axios.delete(`/api/brand/${id}`, {
        headers: { Authorization: token },
      });
      setCallback(!callback);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  return (
    <div className="categories">
      <form onSubmit={createBrand}>
        <label htmlFor="category">Brand</label>
        <input
          type="text"
          name="category"
          value={brand}
          require="true"
          onChange={(e) => setBrand(e.target.value)}
        ></input>
        <button type="submit">{onEdit ? "Update" : "Save"}</button>
      </form>

      <div className="col">
        {brands.map((brand) => (
          <div className="row" key={brand._id}>
            <p>{brand.name}</p>
            <div>
              <button onClick={() => editBrand(brand._id, brand.name)}>
                Edit
              </button>
              <button
                onClick={() =>
                  window.confirm("Delete")
                    ? deleteBrand(brand._id)
                    : alert("notdeleted")
                }
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
