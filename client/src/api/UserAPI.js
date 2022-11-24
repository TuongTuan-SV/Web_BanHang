import { useState, useEffect } from "react";
import axios from "axios";

export default function UserAPI(token) {
  const [Logged, setLogged] = useState(false);
  const [IsAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState([]);
  const [history, setHistory] = useState([]);
  const [callback, setCallback] = useState(false);
  const [users, setUsers] = useState([]);
  const [role, setRole] = useState(0);
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [result, setResult] = useState(0);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          `/user/getuser?limit=${
            page * 9
          }&${role}&${sort}&First[regex]=${search}`,
          {
            headers: { Authorization: token },
          }
        );
        console.log(res);
        setUsers(res.data.users);
        setResult(res.data.result);
      } catch (err) {
        alert(err.response.data.msg);
      }
    };

    getUser();
  }, [callback, role, sort, search]);
  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const res = await axios.get("/user/info", {
            headers: { Authorization: token },
          });
          setLogged(true);

          res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);
          setCart(res.data.cart);
          // console.log(res.data)
        } catch (err) {
          alert(err.response.data.msg);
        }
      };

      getUser();
    }
  }, [token]);

  const addCart = async (product) => {
    if (!Logged) return alert("Log in to add product!");

    const check = cart.every((item) => {
      return item._id !== product._id;
    });

    if (check) {
      setCart([...cart, { ...product, quantity: 1 }]);

      await axios.patch(
        "/user/addcart",
        { cart: [...cart, { ...product, quantity: 1 }] },
        {
          headers: { Authorization: token },
        }
      );
      alert("Product have been add to cart");
    } else {
      console.log(cart);
      alert("This product has been add to cart");
    }
  };
  return {
    Logged: [Logged, setLogged],
    IsAdmin: [IsAdmin, setIsAdmin],
    cart: [cart, setCart],
    addCart: addCart,
    history: [history, setHistory],
    callback: [callback, setCallback],
    admin_getuser: [users, setUsers],
    role: [role, setRole],
    sort: [sort, setSort],
    search: [search, setSearch],
    page: [page, setPage],
    result: [result, setResult],
  };
}
