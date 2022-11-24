import React, { useContext, useState } from "react";
import { GlobalState } from "../../../GlobalState";
import axios from "axios";

export default function Category() {
  const state = useContext(GlobalState);
  const [categories, setCategories] = state.categoryAPI.categories;
  const [category, setCategory] = useState("");
  const [token] = state.token;
  const [callback, setCallback] = state.categoryAPI.callback;
  const [onEdit, setOnedit] = useState(false);
  const [id, setId] = useState("");
  const createCategory = async (e) => {
    e.preventDefault();
    try {
      if (onEdit) {
        const res = await axios.put(
          `/api/category/${id}`,
          { name: category },
          {
            headers: { Authorization: token },
          }
        );
        console.log(res);
      } else {
        const res = await axios.post(
          "/api/category",
          { name: category },
          {
            headers: { Authorization: token },
          }
        );
        console.log(res);
      }
      setOnedit(false);
      setCategory("");
      setCallback(!callback);
    } catch (err) {
      console.log(err);
      alert(err.response.data.msg);
    }
  };

  const editCategory = async (id, name) => {
    setId(id);
    setCategory(name);
    setOnedit(true);
  };

  const deleteCategory = async (id) => {
    try {
      const res = await axios.delete(`/api/category/${id}`, {
        headers: { Authorization: token },
      });
      console.log(res.data.msg);
      setCallback(!callback);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  return (
    <div className="categories">
      <form onSubmit={createCategory}>
        <label htmlFor="category">Category</label>
        <input
          type="text"
          name="category"
          value={category}
          require="true"
          onChange={(e) => setCategory(e.target.value)}
        ></input>
        <button type="submit">{onEdit ? "Update" : "Save"}</button>
      </form>

      <div className="col">
        {categories.map((category) => (
          <div className="row" key={category._id}>
            <p>{category.name}</p>
            <div>
              <button onClick={() => editCategory(category._id, category.name)}>
                Edit
              </button>
              <button
                onClick={() =>
                  window.confirm("Delete")
                    ? deleteCategory(category._id)
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
