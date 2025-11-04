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
      return res.status(401).json({
        success: false,
        error: "Token not provided.",
      });
    }

    const payload = jwt.verify(token, jwtKey);

    if (typeof payload !== "object" || !payload.userId || !payload.username) {
      console.error("Invalid JWT payload:", payload);
      return res.status(401).json({
        success: false,
        error: "Invalid authentication token.",
      });
    }

    req.id = payload.userId;
    req.username = payload.username;

    next();
  } catch (err: any) {
    console.error("Auth error:", err.message);

    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        error: "Your session has expired. Please log in again.",
      });
    }

    return res.status(401).json({
      success: false,
      message: "No Token or Invalid Token",
    });
  }
}
