import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const sendOtp = async (email, otp) => {
  try {
    const mailOption = {
      from: `Your App name ${process.env.GMAIL_USER}`,
      to: email,
      subject: "Your verfication code",
      text: `Your Otp ${otp}`,
      html: `<b>OTP ${otp}</b>`,
    };
    const info = await transporter.sendMail(mailOption);
    console.log("Otp send successfully", info.messageId);
    return true;
  } catch (error) {
    console.log("Error in sending otp", error.message);
  }
};

export default sendOtp;
