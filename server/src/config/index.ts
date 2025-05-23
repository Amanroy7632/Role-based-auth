import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});
export const PORT = process.env.ORDER_SERVICE_PORT;
export const VERSION = process.env.VERSION;
export const NODE_ENV = process.env.NODE_ENV;
export const DB_URL = process.env.DATABASE_URL;
export const REDIS_URL = process.env.REDIS_URL;
export const JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET || "dskjfbkjdf";
export const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "dskjfbkjdf";
export const JWT_ACCOUNT_VERIFICATION_SECRET =
  process.env.JWT_ACCOUNT_VERIFICATION_SECRET || "dskjfbkjdf";
export const SMTP_MAIL = process.env.SMTP_MAIL;
export const SMTP_PASSWORD = process.env.SMTP_PASSWORD;
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
