import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_ACCESS_SECRET ,JWT_ACCOUNT_VERIFICATION_SECRET} from "../config";
import { IUser } from "../interfaces/user.interface";
import { ApiError } from "../utils";
const verifyJwt = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const accessToken =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "") ||
      null;
    if (!accessToken) {
      return next(new ApiError(401, "Expired access token"));
    }
    const decoded = jwt.verify(accessToken, JWT_ACCESS_SECRET) as IUser;

    if (decoded) {
      (req as any).user = decoded;
    }

    next();
  } catch (error) {
    next(new ApiError(401, "Unauthorized: Invalid token"));
  }
};


export default verifyJwt;
