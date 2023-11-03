const express = require("express");

const { createUser, userLogin } = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/signup").post(createUser);
router.route("/login").post(protect, userLogin);

module.exports = router;
