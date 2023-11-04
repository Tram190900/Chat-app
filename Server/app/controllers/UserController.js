const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

createToken = (_id) => {
  const jwtKey = process.env.JWT_SECRET_KEY;
  return jwt.sign({ _id }, jwtKey, { expiresIn: "3d" });
};

const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await userModel.findOne({ email });
    if (user)
      return res.status(400).json("User with the given email already exits...");
    if (!name || !email || !password)
      return res.status(400).json("All fields are required...");
    if (!validator.isEmail(email))
      return res.status(400).json("Email must be valid email...");
    if (!validator.isStrongPassword)
      return res.status(400).json("Password must be strong password...");
    user = new userModel({ name, email, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    const token = createToken(user._id);
    res.status(200).json({ _id: user._id, name, email, token });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await userModel.findOne({ email });

    if (!user) return res.status(400).json("Invalid email or password...");
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      return res.status(400).json("Invalid email or password...");
    const token = createToken(user._id);
    res.status(200).json({ _id: user._id, name: user.name, email, token });
  } catch (error) {
    console.log(err);
    res.status(500).json(err);
  }
};

module.exports = { register, loginUser };
