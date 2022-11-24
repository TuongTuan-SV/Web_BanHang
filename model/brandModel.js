const mongoose = require("mongoose");

const BrandScheme = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Brand", BrandScheme);
