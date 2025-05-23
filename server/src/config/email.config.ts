import nodemailer from "nodemailer";
import { ACCOUNT_CREATE_SUCCESS_MAIL } from "../emailTemplates";
import { SMTP_MAIL, SMTP_PASSWORD } from ".";
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: false,
  auth: {
    user: SMTP_MAIL,
    pass: SMTP_PASSWORD,
  },
  logger: false,
  debug: true,
});
export async function sendMail(to: string, subject: string, html: string) {
  return await transporter.sendMail({
    from: process.env.SMTP_MAIL,
    to,
    subject,
    html,
  });
}
