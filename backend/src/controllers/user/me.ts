import type { Request, Response } from "express";
import { accountModel } from "../../db/index.js";

export default async function myInfo(req: Request, res: Response) {
  try {
    if (!req.id) {
      return res.status(401).json({
        success: false,
        error: "Unauthorized. Please log in again.",
      });
    }

    const account = await accountModel
      .findOne({ userId: req.id })
      .populate("userId", "username phone firstName lastName _id")
      .lean();

    if (!account) {
      return res.status(404).json({
        success: false,
        error: "Account not found for this user.",
      });
    }

    const { balance, userId } = account;

    return res.status(200).json({
      success: true,
      data: {
        balance,
        ...userId, // contains username, phone, firstName, lastName, _id
      },
    });
  } catch (err: any) {
    console.error("Error fetching user info:", err.message);
    return res.status(500).json({
      success: false,
      error: "Something went wrong while fetching account info.",
    });
  }
}
