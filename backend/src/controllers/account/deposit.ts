import type { Request, Response } from "express";
import { accountModel } from "../../db/index.js";

export default async function deposit(req: Request, res: Response) {
  const { amount } = req.body;
  const userId = req.id;

  if (!amount || typeof amount !== "number" || amount <= 0) {
    return res.status(400).json({
      success: false,
      error: "Invalid amount: must be a positive number",
    });
  }

  if (amount > 100000) {
    return res.status(400).json({
      success: false,
      error: "Maximum deposit limit is ₹1,00,000",
    });
  }

  try {
    const account = await accountModel.findOneAndUpdate(
      { userId },
      { $inc: { balance: amount * 100 } }, // Convert to paisa
      { new: true }
    );

    if (!account) {
      return res.status(404).json({
        success: false,
        error: "Account not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: `₹${amount} added successfully`,
      data: {
        newBalance: account.balance,
      },
    });
  } catch (err) {
    console.error("Deposit error:", err);
    return res.status(500).json({
      success: false,
      error: "Failed to add money",
    });
  }
}
