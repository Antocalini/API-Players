import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import AppError from "../utils/appError.js"; // <--- IMPORT AppError

const signToken = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "24h",
  });
};

export const register = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;

    // Mongoose validation (like minlength for password) will be caught
    // by the general catch block and handled by the error middleware.
    // If you need specific checks here before Mongoose validation, you can add them:
    // if (!email || !password) {
    //   return next(new AppError("Please provide email and password", 400));
    // }

    const newUser = await User.create({
      email,
      password,
      role,
    });

    const token = signToken(newUser._id, newUser.email, newUser.role);

    res.status(201).json({
      status: "success",
      token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    // This catch block will pass any error (including Mongoose ValidationErrors)
    // to your error handling middleware.
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      // <--- USE AppError here
      return next(new AppError("Email and password required!", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.comparePassword(password))) {
      // <--- USE AppError here
      return next(new AppError("Invalid credentials (email or password incorrect)!", 401));
    }

    const token = signToken(user._id, user.email, user.role);

    res.json({
      status: "success",
      token,
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};