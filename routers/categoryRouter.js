const router = require("express").Router()
const categoriCTL = require("../controllers/categoryCTL")
const auth = require("../middleware/auth")
const authAdmin = require("../middleware/authAdmin")

router.route('/category')
    .get(categoriCTL.getCategories)
    .post(auth, authAdmin, categoriCTL.createCategory)

router.route('/category/:id')
    .delete(auth, authAdmin,categoriCTL.deleteCategory)
    .put(auth, authAdmin,categoriCTL.updateCategory)
module.exports = router