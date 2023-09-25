import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "5d",
    }
  );
};

// User registration
export const register = async (req, res, next) => {
  const { email, password, name, role, photo, gender } = req.body;
  try {
    let user = null;
    if (role === "patient") {
      user = await User.findOne({ email: email });
    } else if (role === "doctor") {
      user = await Doctor.findOne({ email: email });
    }

    // Check if user is already registered
    if (user) {
      return res.status(400).json({ message: `User already exists` });
    }
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    if (role === "patient") {
      user = new User({
        name,
        email,
        password: hashPassword,
        photo,
        gender,
        role,
      });
    }
    if (role === "doctor") {
      user = new Doctor({
        name,
        email,
        password: hashPassword,
        photo,
        gender,
        role,
      });
    }
    await user.save();
    res
      .status(200)
      .json({ success: true, message: "User successfully created." });
  } catch (e) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error try again." });
  }
};

// User login
export const login = async (req, res, next) => {
  const { email } = req.body;
  console.log(email);
  try {
    let user = null;
    const patinet = await User.findOne({ email: email });
    const doctor = await Doctor.findOne({ email: email });
    if (patinet) {
      user = patinet;
    }
    if (doctor) {
      user = doctor;
    }
    // Check if user exist or not
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // compare password
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    ); //compare function take 2 parameter one is password provided by user(password) and another is password in DB(user.password)

    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
    // If password match then generate JWT token
    // get token
    const token = generateToken(user);

    // Login user
    const { password, role, appointments, ...rest } = user._doc;
    res.status(400).json({
      success: true,
      message: "Successfully login",
      token,
      data: { ...rest },
      role,
    });
  } catch (e) {
    res.status(500).json({ success: false, message: "Failed to login" });
  }
};
