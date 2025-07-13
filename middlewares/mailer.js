// middleware/mailer.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const email_user = encodeURIComponent(process.env.EMAIL_USER);
const email_pass = encodeURIComponent(process.env.EMAIL_PASS);

export const sendWelcomeEmail = async (toEmail, userName) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: email_user,
        pass: email_pass,
      },
    });

    const mailOptions = {
      from: `"SkillBridge Shop" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: "🎉 Welcome to SkillBridge!",
      html: `
        <h2>Hi ${userName},</h2>
        <p>Thank you for registering with platform!</p>
        <p>Start shopping amazing products now 🚀</p>
        <p>Cheers,<br/>My Team</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Welcome email sent to ${toEmail}`);
  } catch (error) {
    console.error("Error sending welcome email:", error);
  }
};
