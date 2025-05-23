export const ACCOUNT_CREATE_SUCCESS_MAIL=`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f2f4f6;
      font-family: 'Arial', sans-serif;
    }
    .email-wrapper {
      max-width: 600px;
      margin: auto;
      background-color: #ffffff;
      padding: 40px 20px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
    }
    .header h1 {
      color: #333;
      margin: 0;
    }
    .content {
      font-size: 16px;
      color: #555;
      line-height: 1.6;
      text-align: left;
    }
    .btn-container {
      text-align: center;
      margin: 30px 0;
    }
    .verify-btn {
      background-color: #007bff;
      color: white;
      padding: 14px 28px;
      border: none;
      border-radius: 6px;
      text-decoration: none;
      font-size: 16px;
      display: inline-block;
    }
    .footer {
      text-align: center;
      font-size: 12px;
      color: #999;
      margin-top: 40px;
    }
    @media only screen and (max-width: 600px) {
      .email-wrapper {
        padding: 20px 15px;
      }
      .verify-btn {
        width: 100%;
        padding: 14px 0;
      }
    }
  </style>
</head>
<body>
  <div class="email-wrapper">
    <div class="header">
      <h1>Verify Your Email</h1>
    </div>
    <div class="content">
      <p>Hi [USER],</p>
      <p>Thank you for registering with us! To complete your registration, please verify your email address by clicking the button below:</p>
    </div>
    <div class="btn-container">
      <a href="[VERIFICATION_LINK]" class="verify-btn">Verify Email</a>
    </div>
    <div class="content">
      <p>If you did not create an account, you can safely ignore this email.</p>
      <p>Thanks,<br>The Aman.dev Team</p>
    </div>
    <div class="footer">
      &copy; 2025 Aman.dev. All rights reserved.
    </div>
  </div>
</body>
</html>
`;
export const ACCOUNT_VERIFICATION_SUCCESS=`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Account Verified</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f4f6f8;
      font-family: Arial, sans-serif;
    }
    .container {
      max-width: 600px;
      background-color: #ffffff;
      margin: 40px auto;
      padding: 30px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    }
    .header {
      text-align: center;
    }
    .header h1 {
      color: #28a745;
      margin: 0;
    }
    .content {
      margin-top: 20px;
      font-size: 16px;
      color: #444;
      line-height: 1.6;
    }
    .footer {
      text-align: center;
      margin-top: 40px;
      font-size: 13px;
      color: #888;
    }
    @media only screen and (max-width: 600px) {
      .container {
        margin: 20px 10px;
        padding: 20px 15px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Account Verified</h1>
    </div>
    <div class="content">
      <p>Hi [USER],</p>
      <p>Congratulations! Your email has been successfully verified, and your account is now active.</p>
      <p>You can now log in and start using all the features of our platform.</p>
      <p>If you have any questions, feel free to reach out to our support team.</p>
      <p>Thank you for joining us!</p>
      <p>— The Aman.dev Team</p>
    </div>
    <div class="footer">
      &copy; 2025 Aman.dev. All rights reserved.
    </div>
  </div>
</body>
</html>
`;
export const RESET_PASSWORD_LINK=`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Reset Your Password</title>
  <style>
    @media only screen and (max-width: 600px) {
      .container {
        padding: 20px !important;
      }
      .btn {
        width: 100% !important;
      }
    }
  </style>
</head>
<body style="margin: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding: 40px 10px;">
        <table class="container" width="100%" style="max-width: 600px; background-color: #ffffff; padding: 40px; border-radius: 8px;">
          <tr>
            <td align="center" style="padding-bottom: 20px;">
              <h2 style="color: #333333;">Reset Your Password</h2>
            </td>
          </tr>
          <tr>
            <td style="color: #555555; font-size: 16px; line-height: 1.6;">
              <p>Hello {{name}},</p>
              <p>We received a request to reset your password. Click the button below to proceed:</p>
              <p style="text-align: center; margin: 30px 0;">
                <a href="{{resetLink}}" class="btn" style="display: inline-block; padding: 12px 24px; background-color: #4f46e5; color: #ffffff; text-decoration: none; border-radius: 5px; font-weight: bold;">
                  Reset Password
                </a>
              </p>
              <p>If you didn't request a password reset, please ignore this email.</p>
              <p>Thanks,<br>The Aman.dev Team</p>
            </td>
          </tr>
          <tr>
            <td style="padding-top: 40px; font-size: 12px; color: #999999; text-align: center;">
              © 2025 Aman.dev. All rights reserved.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`
