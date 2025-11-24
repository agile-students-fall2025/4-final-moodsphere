const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("../models/User");


router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(409).json({ error: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name: name || "Anonymous",
    email,
    password: hashedPassword,
  });

  res.status(201).json({
    message: "User created successfully",
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    },
  });
});


router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  res.json({
    message: "Login successful",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});


router.post("/signout", (req, res) => {
  res.json({ message: "Sign out successful" });
});


router.post("/signup", (req, res, next) => {
  req.url = "/register";
  next();
});

router.post("/signin", (req, res, next) => {
  req.url = "/login";
  next();
});

module.exports = router;
