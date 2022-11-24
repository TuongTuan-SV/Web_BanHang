import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "../../../GlobalState";
import { Link } from "react-router-dom";
import axios from "axios";
import PaypalButton from "./PaypalButton";
import PayPalButton2 from "./PayPalBtutton2";

export default function Cart() {
  const state = useContext(GlobalState);
  const [cart, setCart] = state.userAPI.cart;
  const [token] = state.token;
  const [callback, setCallback] = state.userAPI.callback;
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((pev, item) => {
        return pev + item.price * item.quantity;
      }, 0);

      setTotal(total);
    };

    getTotal();
  }, [cart]);

  const addtocart = async (cart) => {
    await axios.patch(
      "/user/addcart",
      { cart },
      {
        headers: { Authorization: token },
      }
    );
  };

  const increment = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity += 1;
      }
    });

    setCart([...cart]);
    addtocart(cart);
  };

  const decrement = (id) => {
    cart.forEach((item) => {
      if (item._id === id && item.quantity > 1) {
        item.quantity === 1 ? (item.quantity = 1) : (item.quantity -= 1);
      }
    });

    setCart([...cart]);
    addtocart(cart);
  };

  const removeItem = (id) => {
    if (window.confirm("Do you want to remove this Product ?")) {
      cart.forEach((item, index) => {
        if (item._id === id) {
          cart.splice(index, 1);
        }
      });
      setCart([...cart]);
      addtocart(cart);
    }
  };

  const tranSuccess = async (payment) => {
    console.log(payment);
    const { id } = payment;
    const { name, address } = payment.payer;
    console.log(address, id, cart, name);

    const res = await axios.post(
      "/api/payment",
      { cart, id, address, name, total },
      {
        headers: { Authorization: token },
      }
    );
    console.log(res);
    setCart([]);
    addtocart([]);
    alert("Order have been place");
    setCallback(!callback);
  };

  if (cart.length === 0) return <div>Cart Emty </div>;
  return (
    <div className="cart">
      <table>
        <thead>
          <tr>
            <td></td>
            <td>Title</td>
            <td>Price</td>
            <td>Quantity</td>
            <td>button</td>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item._id}>
              <td>
                <img src={item.image.url} />
              </td>
              <td>{item.title}</td>
              <td>
                <div className="quantity">
                  <button onClick={() => decrement(item._id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increment(item._id)}>+</button>
                </div>
              </td>
              <td>
                {(item.quantity * item.price).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </td>
              <td>
                <div className="delete" onClick={() => removeItem(item._id)}>
                  x
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="total">
        <h3>
          Total :{" "}
          {total.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </h3>
        <PayPalButton2 total={total} tranSuccess={tranSuccess} />
      </div>
    </div>
  );
}
// {
//           cart.map(product => {
//             return(
//               <div className='DetailProduct cart' key = {product._id}>
//                 <img src = {product.image.url} alt = " "></img>
//                 <div className='box_detail'>
//                     <h2>{product.title}</h2>
//                     <h3>{(product.price * product.quantity).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</h3>
//                     <p>{product.description}</p>
//                     <p>{product.content}</p>

//                     <div className='quantity'>
//                       <button onClick={() => decrement(product._id)}>-</button>
//                       <span>{product.quantity}</span>
//                       <button onClick={() => increment(product._id)}>+</button>
//                     </div>
//                     <div className='delete' onClick={() => removeItem(product._id)}>X</div>
//                 </div>
//             </div>
//             )
//           })
//         }
