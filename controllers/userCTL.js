const Users = require("../model/userModel");
const Payments = require("../model/paytmentModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
}

const userCTL = {
  getUserAdmin: async (req, res) => {
    try {
      const features = new APIfeatures(Users.find(), req.query)
        .filtering()
        .sortting();

      const users = await features.query;

      res.json({
        status: "success",
        result: users.length,
        users: users,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.mesage });
    }
  },
  updateUser: async (req, res) => {
    try {
      const { firstName, lastName, email, role } = req.body;
      // console.log(firstName, lastName, email);
      await Users.findByIdAndUpdate(
        { _id: req.params.id },
        {
          firstName: firstName.toLowerCase(),
          lastName: lastName.toLowerCase(),
          email,
          role,
        }
      );
      res.json({ msg: "User Updated" });
    } catch (err) {
      return res.status(500).json({ msg: err.mesage });
    }
  },
  deleteUser: async (req, res) => {
    try {
      await Users.findByIdAndDelete(req.params.id);
      res.json({ msg: "User Deleted" });
    } catch (err) {
      return res.status(500).json({ msg: err.mesage });
    }
  },
  register: async (req, res) => {
    try {
      const { firstName, lastName, email, password, role } = req.body;

      const user = await Users.findOne({ email });
      if (user) return res.status(400).json({ msg: "Email alredy exists. " });

      if (password.length < 8)
        return res
          .status(400)
          .json({ msg: "Password need to be at least 8 char long. " });

      // Encryp Password (Mã hóa mặt khẩu)
      const pswHash = await bcrypt.hash(password, 10);

      // Create new user
      const newUser = new Users({
        firstName: firstName,
        lastName,
        email,
        role,
        password: pswHash,
      });

      await newUser.save();

      // JSON WebToken to Authentication
      const accesstoken = createAccessToken({ id: newUser._id });
      const refreshtoken = createRefreshToken({ id: newUser._id });

      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/user/refresh_token",
      });
      res.json({ accesstoken });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({ email });

      if (!user) return res.status(400).json({ msg: "User not exists." });

      const Match = await bcrypt.compare(password, user.password);

      if (!Match) return res.status(400).json({ msg: "Incorrect Password." });

      // If login success Create new token and refresh token
      // JSON WebToken to Authentication
      const accesstoken = createAccessToken({ id: user._id });
      const refreshtoken = createRefreshToken({ id: user._id });

      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/user/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000, //7 day
      });
      res.json({ user, accesstoken });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/user/refresh_token" });
      return res.json({ msg: "Logged out" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  refreshToken: (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;

      if (!rf_token)
        return res
          .status(400)
          .json({ msg: "Please Login or Regist a new Account" });

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err)
          return res
            .status(400)
            .json({ msg: "Please Login or Regist a new Account" });

        const accesstoken = createAccessToken({ id: user.id });

        res.json({ accesstoken });
      });

      res.json({ refreshToken: rf_token });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select("-password");

      if (!user) return res.status(400).json({ msg: "User not exists" });

      res.json(user);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  addcart: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id);

      if (!user) return res.status(400).json({ msg: "User not exists" });

      await Users.findOneAndUpdate(
        { _id: req.user.id },
        {
          cart: req.body.cart,
        }
      );

      return res.json({ msg: "Add to cart" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  gethistory: async (req, res) => {
    try {
      const history = await Payments.find({ user_id: req.user.id });

      res.json(history);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "11m" });
};

const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

module.exports = userCTL;
