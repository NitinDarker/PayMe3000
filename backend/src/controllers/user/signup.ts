import { type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { z } from "zod";
import { userModel } from "../../db/index.js";
import createAccount from "../account/createAccount.js";

const jwtKey = process.env.JWT_KEY as string;

const goodUser = z.object({
  username: z
    .string()
    .min(3)
    .max(30)
    .transform((s) => s.toLowerCase()),
  phone: z.number().min(10),
  password: z.string().min(8, "Password must be at least 8 characters"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
});

export default async function signup(req: Request, res: Response) {
  const user = req.body;
  const validateUser = goodUser.safeParse(user);

  if (!validateUser.success) {
    console.error("Zod Validation Failed:", validateUser.error.format());
    return res.status(400).json({
      success: false,
      error: `Invalid input data.`,
    });
  }

  const { username, phone, password, firstName, lastName } = validateUser.data;

  try {
    const existingUser = await userModel.findOne({ username });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: "Username is already taken.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      username,
      phone,
      password: hashedPassword,
      firstName,
      lastName,
    });
    const user = await newUser.save();

    console.log("User created:", username);

    await createAccount(user._id);

    const token = jwt.sign(
      { userId: newUser._id, username: newUser.username },
      jwtKey,
      { expiresIn: "7d" }
    );

    return res.status(201).json({
      success: true,
      message: `Welcome, ${firstName}!`,
      token: token,
    });
  } catch (e: any) {
    console.log("Signup error: ", e?.message || e);

    if (e?.code === 11000) {
      return res.status(409).json({
        success: false,
        error: "User with that username or phone number already exists.",
      });
    }

    if (e.message?.includes("Cannot create user account")) {
      return res.status(500).json({
        success: false,
        error: "Failed to create linked account. Please try again later.",
      });
    }

    return res.status(500).json({
      success: false,
      error: "Something went wrong while signing up. Please try again later.",
    });
  }
}
