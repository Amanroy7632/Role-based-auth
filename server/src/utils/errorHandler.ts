import { Request, Response, NextFunction } from "express";
import ApiError from "./ApiError";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const statusCode = err.statusCode ?? 500;
  const message = err.message ?? "Something went wrong";

  if (process.env.NODE_ENV !== "production") {
    const apiError = new ApiError(statusCode, message, undefined, err.stack);
    return res.status(statusCode).json({
      statusCode: apiError.statusCode,
      message: apiError.message,
      success: apiError.success,
      errors: apiError.errors,
      stack: apiError.stack,
    });
  }

  return res.status(statusCode).json({
    statusCode,
    message,
    success: false,
  });
};

export default errorHandler;
