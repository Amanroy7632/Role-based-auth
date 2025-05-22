import { PrismaClient } from "../../generated/prisma";
import { ILogin, ILoginResponse } from "../interfaces/auth.interface";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { ApiError } from "../utils";
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from "../config";

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
