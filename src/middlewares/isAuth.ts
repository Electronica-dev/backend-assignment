import { verify, JwtPayload, TokenExpiredError } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export interface IAuthUser extends Request {
  user?: string | JwtPayload;
}

export const verifyToken = async (
  req: IAuthUser,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.headers.cookie) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const token = req.headers.cookie.split("=")[1];

    if (!process.env.JWT_SECRET_KEY) {
      return res.status(500).json({ error: "Error validating token" });
    }

    const decoded = verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded) {
      throw new Error();
    }
    req.user = decoded;

    next();
  } catch (error) {
    console.error(error);
    if (error instanceof TokenExpiredError) {
      return res.status(401).json({
        message: "Unauthorized"
      })
    }
    return res.status(500).json({ message: "Error validating token" });
  }
};
