// Email Verification Template with OTP
export const EMAIL_VERIFY_TEMPLATE = (userName, otp) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
    <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f3f4f6;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center; border-radius: 16px 16px 0 0;">
                            <div style="width: 80px; height: 80px; background-color: rgba(255, 255, 255, 0.2); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 16px;">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                </svg>
                            </div>
                            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; line-height: 1.2;">Verify Your Email</h1>
                        </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px 30px;">
                            <p style="margin: 0 0 16px; font-size: 18px; color: #1f2937; font-weight: 600;">
                                Hi ${userName},
                            </p>
                            <p style="margin: 0 0 24px; font-size: 16px; color: #4b5563; line-height: 1.6;">
                                Thanks for signing up! We're excited to have you on board. Please use the verification code below to verify your email address.
                            </p>

                            <!-- OTP Code Box -->
                            <table role="presentation" style="width: 100%; margin: 32px 0;">
                                <tr>
                                    <td align="center">
                                        <div style="background: linear-gradient(135deg, #f0f4ff 0%, #f3e8ff 100%); border: 2px dashed #667eea; border-radius: 12px; padding: 24px; display: inline-block;">
                                            <p style="margin: 0 0 8px; font-size: 14px; color: #6b7280; font-weight: 500; text-transform: uppercase; letter-spacing: 1px;">Your Verification Code</p>
                                            <p style="margin: 0; font-size: 36px; color: #667eea; font-weight: 700; letter-spacing: 8px; font-family: 'Courier New', monospace;">
                                                ${otp}
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            </table>

                            <p style="margin: 24px 0 0; font-size: 16px; color: #4b5563; line-height: 1.6;">
                                Enter this code in the verification page to complete your registration.
                            </p>

                            <!-- Warning Box -->
                            <div style="margin-top: 32px; padding: 16px; background-color: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 8px;">
                                <p style="margin: 0; font-size: 14px; color: #92400e; line-height: 1.6;">
                                    <strong>⚠️ Security Notice:</strong> This code will expire in <strong>24 hours</strong>. If you didn't request this code, please ignore this email.
                                </p>
                            </div>

                            <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
                                <p style="margin: 0; font-size: 14px; color: #6b7280; line-height: 1.6;">
                                    If you have any questions, feel free to reach out to our support team.
                                </p>
                            </div>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-radius: 0 0 16px 16px;">
                            <p style="margin: 0 0 8px; font-size: 14px; color: #6b7280;">
                                © ${new Date().getFullYear()} My Tasks. All rights reserved.
                            </p>
                            <p style="margin: 0; font-size: 12px; color: #9ca3af;">
                                This is an automated message, please do not reply to this email.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`;

// Password Reset Template with OTP
export const RESET_PASSWORD_TEMPLATE = (userName, otp) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
    <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f3f4f6;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); padding: 40px 30px; text-align: center; border-radius: 16px 16px 0 0;">
                            <div style="width: 80px; height: 80px; background-color: rgba(255, 255, 255, 0.2); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 16px;">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                </svg>
                            </div>
                            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; line-height: 1.2;">Reset Your Password</h1>
                        </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px 30px;">
                            <p style="margin: 0 0 16px; font-size: 18px; color: #1f2937; font-weight: 600;">
                                Hi ${userName},
                            </p>
                            <p style="margin: 0 0 24px; font-size: 16px; color: #4b5563; line-height: 1.6;">
                                We received a request to reset your password. Use the code below to reset your password and regain access to your account.
                            </p>

                            <!-- OTP Code Box -->
                            <table role="presentation" style="width: 100%; margin: 32px 0;">
                                <tr>
                                    <td align="center">
                                        <div style="background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); border: 2px dashed #ef4444; border-radius: 12px; padding: 24px; display: inline-block;">
                                            <p style="margin: 0 0 8px; font-size: 14px; color: #6b7280; font-weight: 500; text-transform: uppercase; letter-spacing: 1px;">Password Reset Code</p>
                                            <p style="margin: 0; font-size: 36px; color: #ef4444; font-weight: 700; letter-spacing: 8px; font-family: 'Courier New', monospace;">
                                                ${otp}
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            </table>

                            <p style="margin: 24px 0 0; font-size: 16px; color: #4b5563; line-height: 1.6;">
                                Enter this code on the password reset page to create a new password for your account.
                            </p>

                            <!-- Warning Box -->
                            <div style="margin-top: 32px; padding: 16px; background-color: #fee2e2; border-left: 4px solid #ef4444; border-radius: 8px;">
                                <p style="margin: 0 0 8px; font-size: 14px; color: #991b1b; line-height: 1.6;">
                                    <strong>🔒 Security Alert:</strong>
                                </p>
                                <p style="margin: 0; font-size: 14px; color: #991b1b; line-height: 1.6;">
                                    • This code will expire in <strong>15 minutes</strong><br>
                                    • If you didn't request a password reset, please ignore this email or contact support immediately<br>
                                    • Never share this code with anyone
                                </p>
                            </div>

                            <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
                                <p style="margin: 0; font-size: 14px; color: #6b7280; line-height: 1.6;">
                                    If you're having trouble resetting your password, please contact our support team for assistance.
                                </p>
                            </div>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-radius: 0 0 16px 16px;">
                            <p style="margin: 0 0 8px; font-size: 14px; color: #6b7280;">
                                © ${new Date().getFullYear()} AUTH_MERN. All rights reserved.
                            </p>
                            <p style="margin: 0; font-size: 12px; color: #9ca3af;">
                                This is an automated message, please do not reply to this email.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`;