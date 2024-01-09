const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const moment = require("moment");
const { promisify } = require("util");

createToken = (_id) => {
  const jwtKey = process.env.JWT_SECRET_KEY;
  return jwt.sign({ _id }, jwtKey, { expiresIn: "3d" });
};

const register = async (req, res) => {
  const { name, email, password, phoneNumber, gender, dateOfBirth } = req.body;
  try {
    let user = await userModel.findOne({ email });
    let userByPhone = await userModel.findOne({ phoneNumber });
    if (user)
      return res.status(400).json("User with the given email already exits...");
    if (userByPhone)
      return res
        .status(400)
        .json("User with the given phone number already exits...");
    if (!name || !email || !password || !phoneNumber  || !dateOfBirth)
      return res.status(400).json("All fields are required...");
    if (!validator.isEmail(email))
      return res.status(400).json("Email must be valid email...");
    if (!validator.isStrongPassword)
      return res.status(400).json("Password must be strong password...");
    const dateOfBirthFormat = moment(dateOfBirth).format("YYYY-MM-DD");
    user = new userModel({
      name,
      email,
      password,
      phoneNumber,
      gender,
      dateOfBirth: dateOfBirthFormat,
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    const token = createToken(user._id);
    res.status(200).json("OK");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const loginUser = async (req, res) => {
  const { phoneNumber, password } = req.body;
  try {
    let user = await userModel.findOne({ phoneNumber });

    if (!user) return res.status(400).json("Invalid phone number or password...");
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      return res.status(400).json("Invalid email or password...");
    const token = createToken(user._id);
    res.status(200).json({ _id: user._id, name: user.name,email: user.email ,phoneNumber, token });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const findUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    let user = await userModel.findById(userId);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getFriends = async (req, res) => {
  const userId = req.params.userId;
  try {
    let user = await userModel.findById(userId).populate("friends", "_id name");
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const userProtect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return res.status(401).json({
      message: "You are not logged in! Please log in to get access.",
    });
  }
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET_KEY
  );
  const this_user = await userModel.findById(decoded._id);
  if (!this_user) {
    return res.status(401).json({
      message: "The user belonging to this token does no longer exists.",
    });
  }
  req.user = this_user;
  next();
};

const findUserByName = async (req, res, next) => {
  const userName = req.params.name;
  try {
    let users = await userModel.find({ name: { $regex: userName } });
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const findUserByPhone = async (req, res, next) => {
  const phoneNumber = req.params.phoneNumber;
  try {
    let user = await userModel.findOne({ phoneNumber: phoneNumber });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  register,
  loginUser,
  findUser,
  getFriends,
  userProtect,
  findUserByName,
  findUserByPhone,
};
