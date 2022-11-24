import { useState, useEffect } from "react";
import axios from "axios";

export default function ProductAPI() {
  const [products, setProducts] = useState([]);
  const [callback, setCallback] = useState(false);
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [level, setLevel] = useState([]);
  const [price, setPrice] = useState(0);
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [result, setResult] = useState(0);
  const [newproducts, setNewProducts] = useState([]);
  const [hotProducts, setHotproducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get(
        `/api/products/?${category.join("&")}${brand.join("&")}&${level.join(
          "&"
        )}&${
          price > 0 ? `price[lte]=${price}` : ""
        }&${sort}&title[regex]=${search}`
      );
      setProducts(res.data.products);
      setResult(res.data.result);
      console.log(res);
    };
    getProducts();
  }, [callback, category, level, price, sort, search, brand]);
  useEffect(() => {
    const getNewProducts = async () => {
      const res = await axios.get(`/api/products/?limit=${page * 9}`);
      setNewProducts(res.data.products.slice(0, 3));
      console.log(res);
    };
    const getHotProducts = async () => {
      const res = await axios.get(`/api/products/?limit=${page * 9}`);
      const data = res.data.products.sort((a, b) => (a.sold < b.sold ? 1 : -1));
      data.slice(0, 3).forEach((product) => {
        setHotproducts((current) => [...current, product]);
      });
    };
    getNewProducts();
    getHotProducts();
  }, []);
  return {
    products: [products, setProducts],
    newproducts: [newproducts, setNewProducts],
    hotproducts: [hotProducts, setHotproducts],
    callback: [callback, setCallback],
    category: [category, setCategory],
    sort: [sort, setSort],
    search: [search, setSearch],
    page: [page, setPage],
    result: [result, setResult],
    level: [level, setLevel],
    price: [price, setPrice],
    brand: [brand, setBrand],
  };
}
