// middleware/mailer.js
import nodemailer from "nodemailer";

export const sendWelcomeEmail = async (toEmail, userName) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
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
