import type { Request, Response } from "express";
import mongoose from "mongoose";
import { accountModel } from "../../db/index.js";

export default async function transferMoney(req: Request, res: Response) {
  const session = await mongoose.startSession();
  session.startTransaction();

  const { to, amount } = req.body;
  const userId = req.id;
  try {
    const fromAccount = await accountModel.findOne({ userId });
    if (!fromAccount || fromAccount.balance! < amount) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        error: "Insufficient balance",
      });
    }

    const toAccount = accountModel.find({ userId: to });
    if (!toAccount) {
      return res.status(404).json({
        success: false,
        message: "To User Account not found!",
      });
    }

    await accountModel
      .updateOne({ userId }, { $inc: { balance: -amount } })
      .session(session);

    await accountModel
      .updateOne({ userId: to }, { $inc: { balance: +amount } })
      .session(session);

    await session.commitTransaction();
    return res.status(200).json({
      success: true,
      message: "Transction successful",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      error: "Transaction failed!",
    });
  }
}
