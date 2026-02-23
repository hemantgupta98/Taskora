import { sendMailSafe } from "../../utils/mailer.js";

const sendOtp = async (email, otp) => {
  return await sendMailSafe({
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
    context: "otp",
  });
};

export default sendOtp;
