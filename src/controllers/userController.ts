const bcrypt = require("bcrypt");
import { sign } from "jsonwebtoken";
import User from "../models/userModels";
import { Request, Response } from "express";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and Password are not provided." });
    }

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();

    return res
      .status(201)
      .json({ message: "User Created Successfully", status: 200 });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error creating user" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and Password are not provided." });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    if (!process.env.JWT_SECRET_KEY) {
      return res.status(401).json({ message: "Invalid JWT secret." });
    }

    const maxAge = 24 * 60 * 60 // 1 day
    const token = sign(
      {
        userId: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: maxAge }
    );

    res.cookie("jwtToken", token, {
      httpOnly: true,
      secure: true,
      maxAge: maxAge * 1000
    })

    return res.status(200).json({
      message: "Login successful. You can now access protected routes."
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred during login. Please try again later.",
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("jwtToken");
    return res.status(200).json({
      message: "Successfully logged out."
    })
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An unexpected error occured. Please try again later."
    })
  }
}

export const message = async (req: Request, res: Response) => {
  try {
    return res
      .status(200)
      .json({ message: "Congratulations. You are an authorized user!" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred. Please try again later." });
  }
};
