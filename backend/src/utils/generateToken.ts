import jwt from "jsonwebtoken";
import { Response } from "express";

const generateToken = (userId: string, res: Response) => {
  const DAYS = 7;

  const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: `${DAYS}d`,
  });

  res.cookie("jwt", token, {
    maxAge: DAYS * 24 * 60 * 60 * 1000, // in ms
    httpOnly: true, // prevent XSS
    sameSite: "strict", // CSRF attacks
    secure: process.env.NODE_ENV !== "development",
  });

  return token;
};

export default generateToken;
