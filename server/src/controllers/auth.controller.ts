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
    this.verifyEmail = this.verifyEmail.bind(this);
    this.getResetPasswordLink = this.getResetPasswordLink.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
    this.getCurrentUser = this.getCurrentUser.bind(this);
    this.refreshUser = this.refreshUser.bind(this);
    this.getVerificationMail = this.getVerificationMail.bind(this);
  }
  async login(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { email, password } = req.body;
      const user = await this.authService.login({ email, password });
      res.cookie("accessToken", user.token.accessToken, {
        sameSite: true,
        secure: NODE_ENV === "production",
      });
      res.cookie("refreshToken", user.token.refreshToken, {
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
  async verifyEmail(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        const {token} = req.query as any;
      if (!token) {
        return next( new ApiError(400, "Invalid token."));
      }
      const updatedUser=await this.authService.verifyEmail(token);
      if (!updatedUser) {
        return next(new ApiError(500,"Failed to verify the user."));
      }
      return res
        .status(200)
        .json(new ApiResponse(200, {}, "Logout successfully."));
    } catch (error) {
      next(error);
    }
  }
  async getResetPasswordLink(req: Request, res: Response, next: NextFunction):Promise<any>{
    try {
      const {email} =req.body;
      const isLinkSent = await this.authService.getResetPasswordLink(email);
      if (!isLinkSent) {
        return next(new ApiError(500,"Failed to send the link"));
      }
      return res.status(200).json(new ApiResponse(200,{},"Reset password link sent to email."));
    } catch (error) {
      next(error);
    }
  }
  async resetPassword(req: Request, res: Response, next: NextFunction):Promise<any>{
    try {
      const {token,password} =req.body;
      const isPasswordReset = await this.authService.resetPassword(token,password);
      if (!isPasswordReset) {
        return next(new ApiError(500,"Failed to reset the password"));
      }
      return res.status(200).json(new ApiResponse(200,{},"Congratulations password reset successfully."));
    } catch (error) {
      next(error);
    }
  }
  async getCurrentUser(req: Request, res: Response, next: NextFunction):Promise<any>{
    try {
      const user =(req as any).user as IUser;
      if (!user) {
        return next(new ApiError(401,"Token expired."));
      }
      return res.status(200).json(new ApiResponse(200,user));
    } catch (error) {
      next(error);
    }
  }
  async refreshUser(req: Request, res: Response, next: NextFunction):Promise<any>{
    try {
      const refreshToken = req.cookies?.refreshToken||null;
      if (!refreshToken) {
        return  next(new ApiError(403,"Unauthorized access"));
      }
      const accessToken = await this.authService.refreshUser(refreshToken);
      res.cookie("accessToken",accessToken,{sameSite:true,httpOnly:true,secure:NODE_ENV==="production"});
      return res.status(200).json(new ApiResponse(200,accessToken));
      
    } catch (error) {
      next(error);
    }
  }
  async getVerificationMail(req: Request, res: Response, next: NextFunction):Promise<any>{
    try {
      const {email} =req.body;
      const isMailSent = await this.authService.getVerificationMail(email);
      return res.status(200).json(new ApiResponse(200,{},"Verificatio Mail has been sent"));
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
