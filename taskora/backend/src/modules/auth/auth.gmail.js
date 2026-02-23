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

const getMailErrorMessage = (error) => {
  const code = error?.code;
  const responseCode = error?.responseCode;

  if (code === "EAUTH" || responseCode === 535) {
    return "Gmail authentication failed. Check EMAIL_APP_USER and EMAIL_APP_PASS.";
  }

  if (code === "ETIMEDOUT" || code === "ESOCKET") {
    return "Mail server timeout. Please try again.";
  }

  if (responseCode === 550 || responseCode === 553 || code === "EENVELOPE") {
    return "Recipient email was rejected by provider.";
  }

  return "OTP email delivery failed.";
};

const sendOtp = async (email, otp) => {
  try {
    const recipient = String(email || "")
      .trim()
      .toLowerCase();

    if (!recipient) {
      throw new Error("Recipient email is missing");
    }

    const mailOption = {
      from: `"Taskora" <${process.env.EMAIL_APP_USER}>`,
      to: recipient,
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
    return { success: true };
  } catch (error) {
    console.log("Error in sending OTP: otp nhi gya", {
      code: error?.code,
      responseCode: error?.responseCode,
      message: error?.message,
    });

    return {
      success: false,
      message: getMailErrorMessage(error),
    };
  }
};

export default sendOtp;
