const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Registor Controller
// POST /api/auth/registor

const registorUser = asyncHandler(async (req, res) => {
  const { fullName, email, phone, password } = req.body;

  // Check if what the user sends is Empty or not
  if (!fullName || !email || !phone || !password) {
    res.status(400);
    throw new Error("All User Feilds Are Required");
  }

  // Check if the user Email is already taken or not
  const isEmailExists = await User.findOne({ email });
  if (isEmailExists) {
    res.status(400);
    throw new Error("Email with this user is already exists.");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    fullName,
    email,
    phone,
    password: hashPassword,
  });

  if (user) {
    res.status(201).json({
      status: true,
      message: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
      },
    });
  } else {
    res.status(400);
    throw new Error("User data is not valid dara");
  }
});

// Login Controller
// POST /api/auth/login

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Email and password are required");
  }

  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          phone: user.phone,
        },
      },
      process.env.SECRET_ACCESS_TOKEN,
      { expiresIn: "7d" }
    );
    res.status(200).json({
      status: true,
      token: accessToken,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// Current Controller
// POST /api/auth/registor

const currentUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    status: true,
    message: req.user,
  });
});

module.exports = { loginUser, registorUser, currentUser };
