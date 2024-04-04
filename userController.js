const User = require("../models/userSchema");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const { application } = require("express");


const createAccount = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error: Signing Up" });
  }
};

const getUser = async (req, res) => {
    try {
      const users = await User.find();
      res.status(201).json(users);
    } catch (error) {
      res.status(500).json({ error: "Unable to retrieve that user information" });
    }
  };
  
  
  const getLogin = async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ error: "Invalid Username" });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid Password" });
      }
      const token = jwt.sign({ userID: user._id }, SECRET_KEY, {
        expiresIn: "1hr",
      });
      res.json({ message: "Login successful" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Unable to login" });
    }
  };
  
  module.exports = {
    createAccount,
    getLogin,
    getUser,
  };