import type { Request, Response } from "express";
import { accountModel } from "../../db/index.js";

export default async function getBalance(req: Request, res: Response) {
  const userId = req.id;

  try {
    const foundAccount = await accountModel.findOne({ userId });
    const balance = (foundAccount?.balance!) / 100;
    res.status(200).json({
      success: true,
      message: balance,
    });
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      success: false,
      error: "Error retrieving balance",
    });
  }
}
