import type { Request, Response } from "express";
import { accountModel } from "../../db/index.js";

export default async function getBalance(req: Request, res: Response) {
  const userId = req.id;

  try {
    const foundAccount = await accountModel.findOne({ userId });
    if (!foundAccount) {
      return res.status(404).json({
        success: false,
        error: "Account not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: {
        balance: foundAccount.balance,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: "Error retrieving balance",
    });
  }
}
