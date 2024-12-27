const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const router = express.Router();

// Register Route
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).send("User registered successfully!");
  } catch (error) {
    res.status(500).send("Error registering user.");
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send("Something went wrong!");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send("Something went wrong!");

    const token = jwt.sign({ id: user._id }, "secret", { expiresIn: "3h" });
    res.status(200).json({ message: "Login successful!", token });
  } catch (error) {
    res.status(500).send("Error logging in.");
  }
});

module.exports = router;
