import jwt from "jsonwebtoken";
import { IUser } from "../interfaces/user.interface";
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET,JWT_ACCOUNT_VERIFICATION_SECRET } from "../config";
export default class TokenService {
  constructor() {}
  generateAccessToken(input: IUser): string {
    return jwt.sign(input, JWT_ACCESS_SECRET, {
      expiresIn: "1d",
    });
  }
  accountVerificationToken(input: {email:string;id:number}): string {
    return jwt.sign(input, JWT_ACCOUNT_VERIFICATION_SECRET, {
      expiresIn: "1d",
    });
  }
  generateRefreshToken(input: IUser): string {
    return jwt.sign(input, JWT_REFRESH_SECRET, {
      expiresIn: "10d",
    });
  }
  
  generateAccessAndRefreshToken(input: IUser): {
    accessToken: string;
    refreshToken: string;
  } {
    const accessToken = jwt.sign(input, JWT_ACCESS_SECRET, {
      expiresIn: "1d",
    });
    const refreshToken = jwt.sign(input, JWT_REFRESH_SECRET, {
      expiresIn: "10d",
    });
    return { accessToken, refreshToken };
  }
}
export const tokenService = new TokenService();