import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
const jwtKey = process.env.JWT_USER_KEY as string;

export default function userAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      success: "false",
      message: "Token is not provided",
    });
  }

  try {
    const payload = jwt.verify(token, jwtKey) as JwtPayload;
    req.id = payload.id as string;
    req.username = payload.username as string;
    next();
  } catch (e) {
    console.log(e);
    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
}
