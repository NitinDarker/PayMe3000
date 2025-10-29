import type { Request, Response } from "express";
import { accountModel } from "../../db/index.js";

export default async function getBalance(req: Request, res: Response) {
  const userId = req.id;

  try {
    const foundAccount = await accountModel.findById(userId);
    res.status(200).json({
      success: true,
      message: foundAccount?.balance,
    });
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      success: false,
      error: "Error retrieving balance",
    });
  }
}
