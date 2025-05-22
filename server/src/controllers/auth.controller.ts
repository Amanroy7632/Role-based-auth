import { NextFunction, Response, Request } from "express";
import AuthService from "../services/auth.service";
import { ApiError, ApiResponse } from "../utils";
import { NODE_ENV } from "../config";
import { IUser } from "../interfaces/user.interface";
export default class AuthController {
  constructor(private authService: AuthService) {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }
  async login(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { email, password } = req.body;
      const user = await this.authService.login({ email, password });
      res.cookie("accessToken", user.token.accessToken, {
        sameSite: true,
        secure: NODE_ENV === "production",
      });
      res.cookie("refreshoken", user.token.refreshToken, {
        sameSite: true,
        secure: NODE_ENV === "production",
        httpOnly: true,
      });
      return res.status(200).json(new ApiResponse(200, user, "Login Success"));
    } catch (error) {
      next(error);
    }
  }
  async logout(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const user = (req as any).user as IUser; 
      if (!user) {
        throw new ApiError(401, "User not logged in.");
      }
      await this.authService.logout(user.id);
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      return res
        .status(200)
        .json(new ApiResponse(200, {}, "Logout successfully."));
    } catch (error) {
      next(error);
    }
  }
  async getProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const user =(req as any).user as IUser;
      const userDetails = await this.authService.getProfile(user.id);
      return res
        .status(200)
        .json(new ApiResponse(200, userDetails));
    } catch (error) {
      next(error);
    }
  }
}
