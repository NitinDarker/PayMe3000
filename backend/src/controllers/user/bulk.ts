import type { Request, Response } from "express";
import { userModel } from "../../db/index.js";

export default async function bulk(req: Request, res: Response) {
  const filter = (req.query.filter as string) || "";
  try {
    const searchRegex = new RegExp(filter, "i");
    const foundUsers = await userModel.find({
      $or: [
        { firstName: searchRegex },
        { lastName: searchRegex },
        { username: searchRegex },
        {
          $expr: {
            $regexMatch: {
              input: { $toString: "$phone" }, // convert number → string
              regex: filter,
            },
          },
        },
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
    console.error("Error in /bulk:", e);
    return res.status(500).json({
      success: false,
      error: "Failed to fetch users. Please try again.",
    });
  }
}
