import type { Request, Response } from "express";
import mongoose, { Types } from "mongoose";
import { accountModel, transactionModel } from "../../db/index.js";

export default async function transferMoney(req: Request, res: Response) {
  const session = await mongoose.startSession();
  session.startTransaction();

  const { to, amount } = req.body;
  const userId = req.id;

  if (!to || !amount || typeof amount !== "number" || amount <= 0) {
    await session.endSession();
    return res.status(400).json({
      success: false,
      error: "Invalid transfer: recipient and positive amount required",
    });
  }

  if (to === userId) {
    await session.endSession();
    return res.status(400).json({
      success: false,
      error: "Cannot transfer money to yourself",
    });
  }

  try {
    const fromAccount = await accountModel.findOne({ userId }).session(session);
    if (!fromAccount || fromAccount.balance! < amount * 100) {
      await session.abortTransaction();
      await session.endSession();
      return res.status(400).json({
        success: false,
        error: "Insufficient balance",
      });
    }

    const toAccount = await accountModel.findOne({ userId: to }).session(session);
    if (!toAccount) {
      await session.abortTransaction();
      await session.endSession();
      return res.status(404).json({
        success: false,
        error: "Recipient account not found",
      });
    }

    await accountModel
      .updateOne({ userId }, { $inc: { balance: -(amount * 100) } })
      .session(session);

    await accountModel
      .updateOne({ userId: to }, { $inc: { balance: +(amount * 100) } })
      .session(session);

    // Save transaction history
    await transactionModel.create(
      [
        {
          from: new Types.ObjectId(userId),
          to: new Types.ObjectId(to),
          amount: amount * 100,
        },
      ],
      { session }
    );

    await session.commitTransaction();
    await session.endSession();
    return res.status(200).json({
      success: true,
      message: "Transaction successful",
    });
  } catch (e) {
    await session.abortTransaction();
    await session.endSession();
    console.log(e);
    return res.status(500).json({
      success: false,
      error: "Transaction failed!",
    });
  }
}
