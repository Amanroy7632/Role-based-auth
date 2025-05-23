import { PrismaClient } from "../../generated/prisma";
import { ILogin, ILoginResponse } from "../interfaces/auth.interface";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { ApiError } from "../utils";
import { NODE_ENV } from "../config";
import {
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  JWT_ACCOUNT_VERIFICATION_SECRET,
} from "../config";
import { IUser } from "../interfaces/user.interface";
import { sendMail } from "../config/email.config";
import {
  ACCOUNT_VERIFICATION_SUCCESS,
  RESET_PASSWORD_LINK,
} from "../emailTemplates";
import { tokenService } from "./token.service";

export default class AuthService {
  constructor(private _prisma: PrismaClient) {}
  async login(input: ILogin): Promise<ILoginResponse> {
    const user = await this._prisma.user.findUnique({
      where: { email: input.email },
    });
    if (!user) {
      throw new ApiError(404, "User not found.");
    }
    const isValidPassword = bcrypt.compare(input.password, user.password);
    if (!isValidPassword) {
      throw new ApiError(401, "Invalid credentials.");
    }
    if (!user.isVerified) {
      throw new ApiError(
        403,
        "Email not verified,Please verify your email first."
      );
    }
    const paylod = {
      name: user.name,
      email: user.email,
      role: user.role,
      id: user.id,
    };
    const { accessToken, refreshToken } = this.generateTokens(paylod);
    await this._prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });
    return { ...paylod, token: { accessToken, refreshToken } };
  }
  async logout(id: number) {
    return await this._prisma.user.update({
      where: { id },
      data: { refreshToken: null },
    });
  }
  async refreshUser(token: string): Promise<string> {
    const decodedToekn = jwt.verify(token, JWT_REFRESH_SECRET) as IUser;
    if (!decodedToekn) {
      throw new ApiError(403, "Refresh token expired.");
    }
    const paylod = {
      name: decodedToekn.name,
      id: decodedToekn.id,
      email: decodedToekn.email,
      role: decodedToekn.role,
    };
    const accessToken = tokenService.generateAccessToken(paylod);
    return accessToken;
  }
  async getProfile(id: number) {
    return await this._prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        mobile: true,
        email: true,
        profileImg: true,
        role: true,
      },
    });
  }
  async verifyEmail(token: string): Promise<any> {
    const decodedToekn = jwt.verify(
      token,
      JWT_ACCOUNT_VERIFICATION_SECRET
    ) as IUser;
    if (!decodedToekn) {
      throw new ApiError(401, "Token Expired.");
    }
    const isVerified = await this._prisma.user.findFirst({
      where: { id: decodedToekn.id, email: decodedToekn.email },
    });
    if (isVerified?.isVerified) {
      throw new ApiError(409, "User already verified.");
    }
    const user = await this._prisma.user.update({
      where: { id: decodedToekn.id, email: decodedToekn.email },
      data: { isVerified: true },
    });
    sendMail(
      decodedToekn.email,
      "Account Verification Successful",
      ACCOUNT_VERIFICATION_SUCCESS.replace("[USER]", user.name)
    );
    return user;
  }
  async getResetPasswordLink(email: string): Promise<boolean> {
    const user = await this._prisma.user.findFirst({
      where: { email },
    });
    if (!user) {
      throw new ApiError(404, "Email not registered.");
    }
    const token = tokenService.accountVerificationToken({
      email: user.email,
      id: user.id,
    });

    await sendMail(
      user.email,
      "Reset Password",
      RESET_PASSWORD_LINK.replace(
        "{{resetLink}}",
        NODE_ENV === "production"
          ? ""
          : `http://localhost:5173/reset-password?token=${token}`
      ).replace("{{name}}", user.name)
    );
    return true;
  }
  async resetPassword(token: string, password: string): Promise<any> {
    const decodedToekn = jwt.verify(
      token,
      JWT_ACCOUNT_VERIFICATION_SECRET
    ) as IUser;
    if (!decodedToekn) {
      throw new ApiError(401, "Token not found.");
    }
    const user = await this._prisma.user.findFirst({
      where: { email: decodedToekn.email },
    });
    if (!user) {
      throw new ApiError(404, "User not found.");
    }
    const hasedPassword = bcrypt.hashSync(password, 10);
    return await this._prisma.user.update({
      where: { id: user.id },
      data: { password: hasedPassword },
    });
  }
  generateTokens(userData: {
    name: string;
    email: string;
    role: string;
    id: number;
  }): { accessToken: string; refreshToken: string } {
    const accessToken = jwt.sign(userData, JWT_ACCESS_SECRET, {
      expiresIn: "1d",
    });
    const refreshToken = jwt.sign(userData, JWT_REFRESH_SECRET, {
      expiresIn: "10d",
    });
    return { accessToken, refreshToken };
  }
}
