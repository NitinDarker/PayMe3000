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
  password: z.string().min(8, "Password must be at least 8 chars"),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
});

export default async function signup(req: Request, res: Response) {
  const user = req.body;
  const validateUser = goodUser.safeParse(user);

  if (!validateUser.success) {
    console.error("Zod Validation Failed:", validateUser.error.format());
    return res.status(400).json({
      success: false,
      error: `Bad user object`,
    });
  }

  const { username, phone, password, firstName, lastName } = validateUser.data;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      username,
      phone,
      password: hashedPassword,
      firstName,
      lastName,
    });
    const user = await newUser.save();

    console.log("User saved successfully, username: ", username);

    createAccount(user._id);

    const token = jwt.sign(
      { userId: newUser._id, username: newUser.username },
      jwtKey
    );

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      token: token,
    });
  } catch (e: any) {
    console.log("Signup error: ", e.errorResponse.errmsg);
    if (e === "Cannot create user account") {
      return res.status(400).json({
        success: false,
        error: "Error while creating account",
      });
    }
    return res.status(400).json({
      success: false,
      error: "User already exists",
    });
  }
}
