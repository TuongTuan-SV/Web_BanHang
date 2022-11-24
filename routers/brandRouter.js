const router = require("express").Router();
const BrandCTL = require("../controllers/brandCTL");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router
  .route("/brand")
  .get(BrandCTL.getBrands)
  .post(auth, authAdmin, BrandCTL.createBrand);

router
  .route("/brand/:id")
  .delete(auth, authAdmin, BrandCTL.deleteBrand)
  .put(auth, authAdmin, BrandCTL.updateBrand);
module.exports = router;
