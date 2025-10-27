import type { Request, Response } from "express";
import { userModel } from "../../db/index.js";

export default async function bulk(req: Request, res: Response) {
  const filter = req.query.filter || "";
  try {
    const foundUsers = await userModel.find({
      $or: [
        { firstName: { $regex: filter } },
        { lastName: { $regex: filter } },
      ],
    });

    const users = foundUsers.filter((user) => user.username !== req.username);

    return res.status(200).json({
      success: true,
      users: users.map((user) => ({
        username: user.username,
        phone: user.phone,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id,
      })),
    });
  } catch (e) {
    console.log(e);
    return res.status(404).json({
      success: false,
      error: "User not found",
    });
  }
}
