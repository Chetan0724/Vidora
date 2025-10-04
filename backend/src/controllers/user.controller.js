import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { generateAccessTokenAndRefreshTokens } from "../utils/generateTokens.js";

const registerUser = async (req, res) => {
  try {
    const { email, fullname, password, profilePic, username } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exits" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      fullname,
      email,
      password: hashedPassword,
      profilePic,
      username,
    });

    await user.save();

    const { accessToken } = await generateAccessTokenAndRefreshTokens(
      user,
      res
    );

    res.status(201).json({
      accessToken,
      user: {
        id: user._id,
        fullname: user.fullname,
        username: user.username,
        email: user.email,
        profilePic: user.profilePic,
      },
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isPasswordCorrect = await user.isPasswordCorrect(password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const { accessToken } = await generateAccessTokenAndRefreshTokens(
      user,
      res
    );

    res.json({
      accessToken,
      user: {
        id: user._id,
        fullname: user.fullname,
        username: user.username,
        email: user.email,
        profilePic: user.profilePic,
      },
      message: "User logged in successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const refreshAccessToken = async (req, res) => {
  try {
    const incomingRefreshToken = req.cookies.refreshToken;

    if (!incomingRefreshToken)
      return res
        .status(401)
        .json({ message: "Unauthorized request. Refresh token missing." });

    const decoded = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== incomingRefreshToken) {
      return res
        .status(401)
        .json({ message: "Invalid refresh token or user not found." });
    }

    const { accessToken } = await generateAccessTokenAndRefreshTokens(
      user,
      res
    );

    res
      .status(200)
      .json({ accessToken, message: "Access token refreshed successfully" });
  } catch (error) {
    res.status(401).json({
      message: "Invalid or expired refresh token",
      error: error.message,
    });
  }
};
