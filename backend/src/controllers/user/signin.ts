import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { Request, Response } from "express";
import { userModel } from "../../db/index.js";
const jwtKey = process.env.JWT_KEY as string;

export default async function signin(req: Request, res: Response) {
  const { username, password } = req.body;

  try {
    const foundUser = await userModel.findOne({ username });

    if (!foundUser) {
      return res.status(404).json({
        success: false,
        error: "User not found!",
      });
    }

    const passwordMatch = bcrypt.compare(password, foundUser!.password);
    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        error: "Invalid Password",
      });
    }

    const token = jwt.sign(
      { userId: foundUser._id, username: foundUser.username },
      jwtKey
    );
    return res.status(200).json({
      success: true,
      message: `Welcome ${username}`,
      token: token,
    });
  } catch (err) {
    console.log("Signin Error: ", err);
    return res.status(404).json({
      success: false,
      error: "Sigin failed",
    });
  }
}
