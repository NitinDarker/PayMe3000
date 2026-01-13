import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { userModel } from "../../db/index.js";

export default async function update(req: Request, res: Response) {
  const { password, firstName, lastName } = req.body;
  const id = req.id;

  const foundUser = await userModel.findOne({ _id: id });
  if (!foundUser) {
    return res.status(404).json({
      success: false,
      error: "User not Found",
    });
  }

  if (password) {
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        error: "Password must be at least 8 characters",
      });
    }
    foundUser.password = await bcrypt.hash(password, 10);
  }
  if (firstName) {
    foundUser.firstName = firstName;
  }
  if (lastName) {
    foundUser.lastName = lastName;
  }

  try {
    const updatedUser = await foundUser.save();
    return res.status(200).json({
      success: true,
      message: "User details updated successfully!",
    });
  } catch (err) {
    console.log("DB error: ", err);
    return res.status(500).json({
      success: false,
      error: "Error while updating information!",
    });
  }
}
