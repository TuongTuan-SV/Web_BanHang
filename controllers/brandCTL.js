const Brand = require("../model/brandModel");

const BrandCTL = {
  getBrands: async (req, res) => {
    try {
      const brand = await Brand.find();
      res.json(brand);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createBrand: async (req, res) => {
    try {
      const { name } = req.body;
      const brand = await Brand.findOne({ name });

      if (brand) return res.status(400).json({ msg: "Category alredy exists" });

      const newBrand = new Brand({ name });

      await newBrand.save();
      res.json({ msg: "Create success", brand: newBrand });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteBrand: async (req, res) => {
    try {
      await Brand.findByIdAndDelete(req.params.id);
      res.json("Brand deleted");
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateBrand: async (req, res) => {
    try {
      const { name } = req.body;

      await Brand.findByIdAndUpdate({ _id: req.params.id }, { name });

      res.json({ msg: "Brand Updated" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = BrandCTL;
