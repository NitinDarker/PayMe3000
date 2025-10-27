import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
const jwtKey = process.env.JWT_KEY as string;

export default function userAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "No token or invalid token format.",
    });
  }

  try {
    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new Error("No token provided");
    }

    const payload = jwt.verify(token, jwtKey);
    if (typeof payload !== "object" || !payload.userId || !payload.username) {
      console.log(payload);
      throw new Error("Invalid token payload.");
    }

    req.id = payload.userId;
    req.username = payload.username;

    next();
  } catch (e) {
    console.log(e);
    return res.status(401).json({
      success: false,
      message: "No Token or Invalid Token",
    });
  }
}
