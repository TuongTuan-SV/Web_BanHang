import React, { useContext, useEffect, useState } from "react";
import Hightcharts from "highcharts";
import HightchartsReact from "highcharts-react-official";
import { GlobalState } from "../../../GlobalState";
import { MdAttachMoney } from "react-icons/md";
import { AiOutlineShoppingCart, AiOutlineUserAdd } from "react-icons/ai";
import axios from "axios";
import Card from "./card/Card";
import PendingOrders from "./pendingorder/PendingOrders";

export default function Dashboard() {
  const state = useContext(GlobalState);
  const [history, setHistory] = useState([]);
  const [IsAdmin] = state.userAPI.IsAdmin;
  const [users] = state.userAPI.admin_getuser;
  const [token] = state.token;
  const [Data, setData] = useState([]);
  useEffect(() => {
    if (token) {
      const getHistory = async () => {
        try {
          const res = await axios.get("/api/payment", {
            headers: { Authorization: token },
          });
          setHistory(res.data);
          // console.log(res,history)
        } catch (err) {
          alert(err.response.data.msg);
        }
      };

      getHistory();
    }
  }, [token, IsAdmin]);

  useEffect(() => {
    const summedResponse = history.slice(-30).reduce((day, cur) => {
      let inAcc = false;
      day.forEach((o) => {
        if (
          new Date(o.createdAt).toLocaleDateString() ==
          new Date(cur.createdAt).toLocaleDateString()
        ) {
          // if obj store is already in new array, increase sum
          o.total += cur.total;
          inAcc = true;
        }
      });
      if (!inAcc) {
        day.push(cur); // if obj store isn't already in new array, add it
      }
      return day;
    }, []);
    setData(summedResponse);
  }, [history]);

  const DailyRevenue = () => {
    let date = new Date();
    let total = 0;
    Data.map((data) => {
      if (
        new Date(data.createdAt).toLocaleDateString() ===
        date.toLocaleDateString()
      )
        total += data.total;
    });
    return total.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const NewOrder = () => {
    let date = new Date();
    let total = 0;
    Data.map((data) => {
      if (
        new Date(data.createdAt).toLocaleDateString() ===
        date.toLocaleDateString()
      )
        total += 1;
    });
    return total;
  };

  const NewUser = () => {
    let date = new Date();
    let total = 0;
    users.map((user) => {
      if (
        new Date(user.createdAt).toLocaleDateString() ===
        date.toLocaleDateString()
      )
        total += 1;
    });
    return total;
  };

  const options = {
    title: {
      text: "30 Day Revenue History",
    },
    xAxis: {
      categories: Data.map((data) => {
        return new Date(data.createdAt).toLocaleDateString();
      }),
    },
    series: [
      {
        name: "",
        data: Data.map((data) => {
          return data.total;
        }),
      },
    ],
  };
  return (
    <div className="admin_dashboard">
      <div className="Header_Dashboard">
        <HightchartsReact highcharts={Hightcharts} options={options} />
      </div>
      <div className="CardHolder">
        <Card
          icon={<MdAttachMoney size={50} color={"red"} />}
          title={"Daily Revenue"}
          content={DailyRevenue()}
        />
        <Card
          icon={<AiOutlineShoppingCart size={50} color={"green"} />}
          title={"New Orders"}
          content={NewOrder()}
        />
        <Card
          icon={<AiOutlineUserAdd size={50} color={"blue"} />}
          title={"New users"}
          content={NewUser()}
        />
      </div>
      <div>
        <PendingOrders />
      </div>
    </div>
  );
}
