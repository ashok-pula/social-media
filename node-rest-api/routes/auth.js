const express = require("express");
const { register, login } = require("../controller/authController");

const router = express.Router();
//register
router.post("/register", register);
router.post("/login", login);
module.exports = router;
