const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/userModel");
// const { use } = require("../routes/userRoutes");

const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({ username, email, password });

  try {
    await user.save();
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: token,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);

    res.json({
      _id: user._id,
      username: user.name,
      email: user.email,
      token: token,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
  //   const { username, password } = req.body;
  //   try {
  //     const user = await User.findOne({ username });
  //     if (!user) {
  //       return res.status(400).json({ message: "User not found" });
  //     }
  //     const isPasswordValid = await user.comparePassword(password);
  //     if (!isPasswordValid) {
  //       return res.status(401).json({ message: "Invalid password" });
  //     }
  //     const token = jwt.sign({ _id: user._id }, process.env.SECRET);
  //     res.status(200).json({ token });
  //   } catch (error) {
  //     res.status(500).json({ message: error.message });
  //   }
};

module.exports = {
  createUser,
  userLogin,
};
