const router = require("express").Router();
const userCTL = require("../controllers/userCTL");
const auth = require("../middleware/auth");

router.post("/signup", userCTL.register);

router.post("/login", userCTL.login);

router.get("/logout", userCTL.logout);

router.get("/getuser", userCTL.getUserAdmin);

router.get("/refresh_token", userCTL.refreshToken);

router.get("/info", auth, userCTL.getUser);

router.get("/history", auth, userCTL.gethistory);

router.patch("/addcart", auth, userCTL.addcart);

router.route("/users/:id").delete(userCTL.deleteUser).put(userCTL.updateUser);
module.exports = router;
