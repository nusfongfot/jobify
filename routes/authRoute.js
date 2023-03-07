const authController = require("../controllers/authController");
const authenticateUser = require("../middleware/auth");
const express = require("express");
const router = express.Router();

router.route("/register").post(authController.register);
router.route("/login").post(authController.login);
router.route("/updateUser").patch(authenticateUser, authController.updateUser);
router.route("/getMe").get(authenticateUser, authController.getMe);

module.exports = router;
