const User = require("../models/User");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    console.log("register");
    console.log(req.body);
    const salt = await bcrypt.genSalt(10);

    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const existingUser = await User.findOne({ email: req.body.email });
    console.log(existingUser);
    if (existingUser) return res.status(500).json("user already exists");
    const newUser = await new User({
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
    });
    console.log(newUser);
    console.log("object");

    const user = await newUser.save();
    // console.log(user);
    res.status(200).json(user);
  } catch (error) {
    console.log("error");
    res.status(500).json(error);
  }
};
const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json("user not found");
    // console.log(user);
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordMatch) return res.status(400).json("password is not matching");

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};
module.exports = { register, login };
