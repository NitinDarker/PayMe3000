import type { Request, Response } from "express";
import { transactionModel } from "../../db/index.js";

export default async function getHistory(req: Request, res: Response) {
  const userId = req.id;

  try {
    const transactions = await transactionModel
      .find({
        $or: [{ from: userId }, { to: userId }],
      })
      .populate("from", "username firstName lastName")
      .populate("to", "username firstName lastName")
      .sort({ timestamp: -1 })
      .limit(50)
      .lean();

    return res.status(200).json({
      success: true,
      data: transactions.map((t) => ({
        id: t._id,
        from: t.from,
        to: t.to,
        amount: t.amount,
        timestamp: t.timestamp,
        type: String(t.from._id) === userId ? "sent" : "received",
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
