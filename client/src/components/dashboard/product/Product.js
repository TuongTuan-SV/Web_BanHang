import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "../../../GlobalState";
import { Link } from "react-router-dom";
import { BiEdit, BiTrash } from "react-icons/bi";
import axios from "axios";
import Filter from "./filter/Filter";
import Pagination from "../../homepage/utils/pagination/Pagination";
// import axios from 'axios'

// const initialState = {
//         product_id : '',
//         title : '',
//         price : 0,
//         description : '',
//         brand : '',
//         category : '',
//         difficulty: '',
//         dimensions : '',
//         players : '',
//     }

export default function OrderDetail() {
  const state = useContext(GlobalState);
  const [products, setProducts] = state.productAPI.products;

  const [token] = state.token;
  const [check, setCheck] = useState(false);
  const [CheckedProducts, setCheckProduct] = useState([]);
  const [callback, setCallback] = state.productAPI.callback;
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5); //9 Per Page

  //Get current posts
  const indexOfLastPost = currentPage * productsPerPage;
  const indexOfFirstPost = indexOfLastPost - productsPerPage;
  const currentProducts = products.slice(indexOfFirstPost, indexOfLastPost);
  const howManyPages = Math.ceil(products.length / productsPerPage);
  // const [loading, setloading]

  // console.log(products)
  const CheckAll = () => {
    products.forEach(async (product) => {
      if (CheckedProducts.includes(product)) {
        setCheckProduct((current) =>
          current.filter((item) => item._id === product._id)
        );
      } else {
        setCheckProduct((current) => [...current, product]);
      }
      product.checked = !check;
      await axios.put(`/api/products/${product._id}`, product, {
        headers: { Authorization: token },
      });
    });
    console.log(CheckedProducts);
    setCheck(!check);
  };

  const ClickUdate = async (item) => {
    item.checked = !item.checked;
    // const Exists = CheckedProducts.forEach((product) => {
    //   if(product._id === item._id){

    //   }
    // });
    if (CheckedProducts.includes(item)) {
      setCheckProduct((current) =>
        current.filter((product) => product._id === item._id)
      );
    } else {
      setCheckProduct((current) => [...current, item]);
    }
    await axios.put(`/api/products/${item._id}`, item, {
      headers: { Authorization: token },
    });

    console.log(CheckedProducts);
    setCheck(!check);
  };

  const deleteProduct = async (product) => {
    try {
      console.log(product._id);
      const destroyImg = axios.post(
        "/api/destroy",
        {
          public_id: product.image.public_id,
        },
        { headers: { Authorization: token } }
      );
      const deleteProduct = axios.delete(`/api/products/${product._id}`, {
        headers: { Authorization: token },
      });

      await destroyImg;
      await deleteProduct;
      setCallback(!callback);
    } catch (err) {
      alert(err.reponse.data.msg);
    }
  };
  const handleMultiDelete = async () => {
    if (CheckedProducts.length > 1) {
      try {
        if (window.confirm("Delete")) {
          CheckedProducts.forEach((product) => {
            deleteProduct(product);
          });
        }
      } catch (err) {
        alert(err.reponse.data.msg);
      }
    } else alert("There is no checked product");
  };
  return (
    <div className="admin_product_page">
      <div className="dashboard_btn">
        <button>
          <Link to="/dashboard/product/createproduct">
            <h3>Create Product </h3>
          </Link>
        </button>

        <button onClick={handleMultiDelete}>
          <h3>Delete Product </h3>
        </button>
      </div>
      <Filter />
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                className="checkall"
                onChange={CheckAll}
              ></input>
            </th>
            <th></th>
            <th>Product_id</th>
            <th>Title</th>
            {/* <th>Description</th> */}
            <th>Brand</th>
            <th>Category</th>
            <th>Difficulty</th>
            <th>Sold</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((item) => (
            <tr key={item._id}>
              <td>
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => ClickUdate(item)}
                ></input>
              </td>
              <td>
                <img src={item.image.url} alt=" " />
              </td>
              <td>{item.product_id}</td>
              <td>{item.title}</td>
              {/* <td style={{maxWidth : '70px', maxHeight : '100px', overflow : 'scroll',whiteSpace : 'nowrap'}}>{item.description}</td> */}
              <td>{item.brand}</td>
              <td>{item.category}</td>
              <td>{item.level}</td>
              <td>{item.sold}</td>
              <td>
                {item.price.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </td>
              <td>
                <Link to={`/dashboard/product/editproduct/${item._id}`}>
                  <BiEdit size="20px" color="green" />
                </Link>
                <button
                  onClick={() =>
                    window.confirm("Delete")
                      ? deleteProduct(item)
                      : alert("notdeleted")
                  }
                >
                  <BiTrash size="20px" color="red" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination pages={howManyPages} setCurrentPage={setCurrentPage} />
    </div>
  );
}
