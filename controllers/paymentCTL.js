const Payments = require("../model/paytmentModel");
const Users = require("../model/userModel");
const Products = require("../model/productModel");

const PaymentCTL = {
  getPayment: async (req, res) => {
    try {
      const payments = await Payments.find();
      res.json(payments);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createPayment: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select("lastName email");
      if (!user) return res.status(400).json({ msg: "User not exists" });

      const { cart, id, address, name, total } = req.body;
      const { _id, lastName, email } = user;

      const newPayment = new Payments({
        user_id: _id,
        User_name: lastName,
        email,
        paymentID: id,
        recipient_name: name,
        address,
        cart,
        total,
      });

      cart.filter((item) => {
        return sold(item._id, item.quantity, item.sold);
      });

      await newPayment.save();
      res.json({ msg: "Payment Success" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updatePayment: async (req, res) => {
    try {
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deletePayment: async (req, res) => {
    try {
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

const sold = async (id, quantity, oldsold) => {
  await Products.findOneAndUpdate(
    { _id: id },
    {
      sold: quantity + oldsold,
    }
  );
};

module.exports = PaymentCTL;
