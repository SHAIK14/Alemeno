const express = require("express");

const { createUser, userLogin } = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/signup").post(protect, createUser);
router.post("/login", userLogin);

module.exports = router;
