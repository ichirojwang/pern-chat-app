import jwt from "jsonwebtoken";
import { Response } from "express";

const generateToken = (userId: string, res: Response) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // in ms
    httpOnly: true, // prevent XSS
    sameSite: "strict", // CSRF attacks
    secure: process.env.NODE_ENV !== "development",
  });

  // console.log(token);

  return token;
};

export default generateToken;
