require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");

//Server Port
const PORT = process.env.PORT || 5000;

// MongoDB URL
const URL = process.env.MONGOOSE_URL;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.get("/", (req, res) => {
  res.json({ Title: "Web ban hang" });
});

//Router

app.use("/user", require("./routers/userRouter"));
app.use("/api", require("./routers/categoryRouter"));
app.use("/api", require("./routers/upload"));
app.use("/api", require("./routers/productRouter"));
app.use("/api", require("./routers/paymentRouter"));
app.use("/api", require("./routers/brandRouter"));
// Connect to Mongodb
mongoose
  .connect(URL)
  .then(() => {
    console.log("Connect to DB");
    app.listen(PORT, () => {
      console.log(`Server is running on PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
