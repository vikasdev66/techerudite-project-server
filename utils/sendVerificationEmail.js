import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const sendVerificationEmail = async (email, verificationToken) => {
  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: `"Your App Name" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Email Verification",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2d3748;">Verify Your Email Address</h2>
          <p style="font-size: 16px; color: #4a5568;">
            Please click the button below to verify your email address:
          </p>
          <a href="${process.env.BASE_URL}/api/auth/verify-email?token=${verificationToken}"
            style="display: inline-block; padding: 12px 24px; background-color: #4299e1; 
            color: white; text-decoration: none; border-radius: 4px; margin-top: 20px;">
            Verify Email
          </a>
          <p style="margin-top: 30px; color: #718096;">
            If you didn't create an account, you can safely ignore this email.
          </p>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log(`Verification email sent to ${email}`);
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error("Failed to send verification email");
  }
};

export { sendVerificationEmail };
