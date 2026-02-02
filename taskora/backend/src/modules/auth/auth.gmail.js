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
      subject: "Password Reset OTP",
      text: `Your One-Time Password (OTP) is ${otp}`,
      html: `
        <h2>We received a request to reset your password.</h2>
        <p>Your 4-digit OTP is:</p>
        <h2>${otp}</h2>
        <p>This OTP is valid for the next 2 minutes</p>
        <p>Please do not share this code with anyone.</p>
        <h3>Taskora</h3>
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
