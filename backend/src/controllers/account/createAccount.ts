import mongoose from "mongoose";
import { type Request, type Response } from "express";
import { accountModel } from "../../db/index.js";

export default async function createAccount(userId: mongoose.Types.ObjectId) {
  try {
    await accountModel.create({
      userId: userId,
      balance: Math.floor(Math.random() * 100000 + 1000),
    });
  } catch (err) {
    throw new Error("Cannot create user account");
  }
}
