import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const verifyRole = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tokenWithBearer = req.headers.authorization;
      const token = tokenWithBearer?.split(" ")[1];

      if (!token) {
        res.status(401).json({
          success: false,
          message: "Unauthorized access",
        });
      }

      const decoded = jwt.verify(
        token as string,
        config.secret_str as string,
      ) as JwtPayload;

      req.user = decoded;

      if (roles.length && !roles.includes(decoded.role)) {
        res.status(403).json({
          success: false,
          message: "Forbidden access",
        });
      }

      next();
    } catch (err: any) {
      res.status(401).json({
        success: false,
        message: err.message,
      });
    }
  };
};


export default verifyRole