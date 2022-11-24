const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      require: true,
    },
    User_name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    paymentID: {
      type: String,
      require: true,
    },
    recipient_name: {
      type: Object,
      require: true,
    },
    address: {
      type: Object,
      require: true,
    },
    cart: {
      type: Array,
      default: [],
    },
    total: {
      type: Number,
      default: 0,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
