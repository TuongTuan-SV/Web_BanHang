import React, { useContext, useState } from "react";
import axios from "axios";
import Loading from "../../../homepage/utils/loading/Loading";
import FormData from "form-data";
import { GlobalState } from "../../../../GlobalState";

const initialState = {
  product_id: "",
  title: "",
  price: 0,
  description: "",
  brand: "",
  category: "",
  difficulty: "",
  dimensions: "",
};

export default function CreateProduct() {
  const state = useContext(GlobalState);
  const [product, setProduct] = useState(initialState);
  const [categories] = state.categoryAPI.categories;
  const [brands] = state.brandAPI.brands;
  const [image, setImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [token] = state.token;
  const [callback, setCallback] = state.productAPI.callback;

  // const history = useNavigate()

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];
      console.log(file);
      if (!file) return alert("File not exist.");

      if (file.size > 1024 * 1024)
        // 1mb
        return alert("Size too large!");

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        // 1mb
        return alert("File format is incorrect.");

      let formData = new FormData();
      formData.append("file", file);

      setLoading(true);
      const res = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      });
      setLoading(false);
      setImage(res.data);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleDestroy = async () => {
    try {
      setLoading(true);
      await axios.post(
        "/api/destroy",
        { public_id: image.public_id },
        {
          headers: { Authorization: token },
        }
      );
      setLoading(false);
      setImage(false);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const createProduct = async (e) => {
    e.preventDefault();
    try {
      if (!image) return alert("Image not selected");

      await axios.post(
        "/api/products",
        { ...product, image },
        {
          headers: { Authorization: token },
        }
      );

      setProduct(initialState);
      setImage(false);
      setCallback(!callback);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const styleUpload = {
    display: image ? "block" : "none",
  };

  return (
    <div className="create_product">
      <div className="upload">
        <input type="file" name="file" id="file_up" onChange={handleUpload} />
        {loading ? (
          <div id="file_img">
            <Loading />
          </div>
        ) : (
          <div id="file_img" style={styleUpload}>
            <img src={image ? image.url : ""} alt="" />
            <span onClick={handleDestroy}>X</span>
          </div>
        )}
      </div>

      <form onSubmit={createProduct}>
        <div className="row">
          <label htmlFor="product_id">Product ID</label>
          <input
            type="text"
            name="product_id"
            id="product_id"
            required
            value={product.product_id}
            onChange={handleChangeInput}
          ></input>
        </div>
        <div className="row">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            required
            value={product.title}
            onChange={handleChangeInput}
          ></input>
        </div>
        <div className="row">
          <label htmlFor="price">Price</label>
          <input
            type="text"
            name="price"
            id="price"
            required
            value={product.price}
            onChange={handleChangeInput}
          ></input>
        </div>
        <div className="row">
          <label htmlFor="dimensions">Dimensions</label>
          <input
            type="text"
            name="dimensions"
            id="dimensions"
            required
            value={product.dimensions}
            onChange={handleChangeInput}
          ></input>
        </div>

        <div className="row">
          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            required
            value={product.description}
            row="5"
            onChange={handleChangeInput}
          ></textarea>
        </div>
        <div className="row brand">
          <label htmlFor="Brand">Brand</label>
          <select
            name="brand"
            value={product.brand}
            className="Select"
            onChange={handleChangeInput}
          >
            <option value="">Select a Brand</option>
            {brands.map((brand) => (
              <option value={brand.name} key={brand._id}>
                {brand.name}
              </option>
            ))}
          </select>
        </div>
        <div className="row Category">
          <label htmlFor="Category">Category</label>
          <select
            name="category"
            value={product.category}
            onChange={handleChangeInput}
            className="Select"
          >
            <option value="">Select a Category</option>
            {categories.map((category) => (
              <option value={category.name} key={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="row level">
          <label htmlFor="level">Level</label>
          <select
            name="level"
            value={product.level}
            onChange={handleChangeInput}
            className="Select"
          >
            <option value="">Select a Level</option>
            {[...Array(6)].map((e, i) => (
              <option value={i + 5} key={i}>
                {i + 5}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
