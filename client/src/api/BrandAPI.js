import { useState, useEffect } from "react";
import axios from "axios";

export default function BrandAPI() {
  const [brands, setbrands] = useState([]);
  const [callback, setCallback] = useState(false);
  useEffect(() => {
    const getBrand = async () => {
      const res = await axios.get("/api/brand");
      setbrands(res.data);
    };
    getBrand();
  }, [callback]);

  return {
    brands: [brands, setbrands],
    callback: [callback, setCallback],
  };
}
