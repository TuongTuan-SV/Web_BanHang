const Product = require("../model/productModel");
const Categorys = require("../model/categoryModel");

//Filter, Sort, Paginating

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filtering() {
    const queryObj = { ...this.queryString }; // queryString = req.query
    // console.log(queryObj)

    const exculedFields = ["page", "sort", "limit"];

    exculedFields.forEach((el) => delete queryObj[el]);

    // console.log({after : queryObj})

    let querySTR = JSON.stringify(queryObj);

    // gte = greater than or equal
    // gt = greater than
    // lte = less than or equal
    // lt = less than
    querySTR = querySTR.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => "$" + match
    );

    this.query.find(JSON.parse(querySTR));
    // console.log({queryObj, querySTR})

    return this;
  }
  sortting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");

      // console.log(sortBy)

      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }
  // paginating() {
  //   const page = this.queryString.page * 1 || 1;

  //   // limit how many result show
  //   const limit = this.queryString.limit * 1 || 9;
  //   const skip = (page - 1) * limit;

  //   this.query = this.query.skip(skip).limit(limit);

  //   return this;
  // }
}

const productCTL = {
  getProducts: async (req, res) => {
    try {
      const features = new APIfeatures(Product.find(), req.query)
        .filtering()
        .sortting();
      // .paginating();

      const products = await features.query;

      res.json({
        status: "success",
        result: products.length,
        products: products,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.mesage });
    }
  },
  createProducts: async (req, res) => {
    try {
      const {
        product_id,
        title,
        price,
        description,
        content,
        image,
        category,
        dimensions,
        brand,
        level,
      } = req.body;

      // check if image has been upload to cloudnary
      if (!image) return res.status(400).json({ msg: "Image not exists!" });

      // // check category
      // const Category = await Categorys.findOne({name : category})
      // if(!Category) return res.status(400).json({msg : "Category not exists!"})

      // check to see if product exist or not
      const product = await Product.findOne({ product_id });
      if (product)
        return res.status(400).json({ msg: "Product already exists!" });

      // create new products
      const new_product = new Product({
        product_id,
        title: title.toLowerCase(),
        price,
        description,
        content,
        image,
        category,
        dimensions,
        brand,
        level,
      });
      await new_product.save();
      res.json("Product Create!");
    } catch (err) {
      return res.status(500).json({ msg: err.mesage });
    }
  },
  deleteProducts: async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.json({ msg: "Product Deleted" });
    } catch (err) {
      return res.status(500).json({ msg: err.mesage });
    }
  },
  updateProducts: async (req, res) => {
    try {
      const {
        title,
        price,
        description,
        content,
        image,
        category,
        dimensions,
        brand,
        level,
      } = req.body;

      if (!image) return res.status(400).json({ msg: "Image not exists!" });

      await Product.findByIdAndUpdate(
        { _id: req.params.id },
        {
          title: title.toLowerCase(),
          price,
          description,
          content,
          image,
          category,
          dimensions,
          brand,
          level,
        }
      );
      res.json({ msg: "Product Updated" });
    } catch (err) {
      return res.status(500).json({ msg: err.mesage });
    }
  },
};

module.exports = productCTL;
