import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils";
export default class Permission {
  constructor() {
    this.isAdmin = this.isAdmin.bind(this);
    this.isSubadminOrAdmin = this.isSubadminOrAdmin.bind(this);
  }
  isAdmin(req: Request, res: Response, next: NextFunction): any {
    const role = (req as any).role || req.user?.role;
    if (role === "ADMIN") {
      return next();
    } else {
      next(new ApiError(403, "Forbidden: admin access required"));
    }
  }

  isSubadminOrAdmin(req: Request, res: Response, next: NextFunction): any {
    const role = (req as any).role || req.user?.role;
    if (role === "ADMIN" || role === "SUBADMIN") {
      return next();
    } else {
      return next(
        new ApiError(403, "Forbidden: admin or subadmin access required")
      );
    }
  }
}
