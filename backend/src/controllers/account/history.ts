import type { Request, Response } from "express";
import { Types } from "mongoose";
import { transactionModel } from "../../db/index.js";

export default async function getHistory(req: Request, res: Response) {
  const userId = req.id;
  const userObjectId = new Types.ObjectId(userId);

  try {
    const transactions = await transactionModel
      .find({
        $or: [{ from: userObjectId }, { to: userObjectId }],
      })
      .populate("from", "username firstName lastName")
      .populate("to", "username firstName lastName")
      .sort({ timestamp: -1 })
      .limit(50)
      .lean();

    return res.status(200).json({
      success: true,
      data: transactions.map((t: any) => ({
        id: t._id,
        from: t.from,
        to: t.to,
        amount: t.amount,
        timestamp: t.timestamp,
        type: t.from._id.toString() === userId ? "sent" : "received",
      })),
    });
  } catch (err) {
    console.log("History error:", err);
    return res.status(500).json({
      success: false,
      error: "Failed to fetch transaction history",
    });
  }
}
