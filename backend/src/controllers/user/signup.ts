import { type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { z } from "zod";
import { userModel } from "../../db/index.js";

dotenv.config();
const jwtKey = process.env.JWT_KEY as string;

const goodUser = z.object({
  username: z.string().toLowerCase(),
  phone: z.number().min(10),
  password: z.string(),
  firstName: z.string(),
  lastName: z.string(),
});

export default async function signup(req: Request, res: Response) {
  const user = req.body;
  const validateUser = goodUser.safeParse(user);

  if (!validateUser.success) {
    return res.status(400).json({
      success: false,
      error: `Bad user object: ${validateUser.error.format()}`,
    });
  }

  const hashedPassword = await bcrypt.hash(user.password, 10);
  user["password"] = hashedPassword;
  const newUser = new userModel({
    ...user,
  });

  try {
    await newUser.save();
  } catch (e: any) {
    return res.status(400).json({
      success: false,
      error: e.errorResponse.errmsg,
    });
  }

  console.log("User saved successfully");

  const token = jwt.sign({ username: newUser.username }, jwtKey);

  return res.status(200).json({
    success: true,
    message: "User created successfully",
    token: token,
  });
}
