import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_APP_USER,
    pass: process.env.EMAIL_APP_PASS,
  },
});

const sendOtp = async (email, otp) => {
  try {
    const mailOption = {
      from: `"Taskora" <${process.env.EMAIL_APP_USER}>`,
      to: email,
      subject: "Your Verification Code",
      text: `Your OTP is ${otp}`,
      html: `
        <h2>Email Verification</h2>
        <p>Your 4-digit OTP is:</p>
        <h1>${otp}</h1>
        <p>This OTP is valid for 2 minutes.</p>
      `,
    };

    const info = await transporter.sendMail(mailOption);
    console.log("OTP sent successfully: otp chal gya", info.messageId);
    return true;
  } catch (error) {
    console.log("Error in sending OTP: otp nhi gya", error.message);
    return false;
  }
};

export default sendOtp;
