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

export const sendLink = async (email, link) => {
  try {
    const mailOption = {
      from: `"Taskora" <${process.env.EMAIL_APP_USER}>`,
      to: email,
      subject: "You're Invited to Join the Team",
      text: `You have been invited to join a team on Taskora. Use the link below to accept the invitation: ${link}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; ;">

       
      <h2>You're Invited to Join Taskora</h2>

      <p>Hello,</p>

      <p>
        You have been invited to join a team on <strong>Taskora</strong>.
        Click the button below to accept your invitation and get started.
      </p>

      <p style="margin: 24px 0;">
        <a 
          href="${link}" 
          style="
            background-color: #4f46e5;
            color: #ffffff;
            padding: 12px 20px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: bold;
            display: inline-block;
          "
        >
          Accept Team Invitation
        </a>
      </p>

      <p style="margin-top: 24px;">
        If you were not expecting this invitation, you can safely ignore this email.
      </p>

      <p>
        Best regards,<br />
        <strong>Taskora Team</strong>
      </p>
    </div>
      `,
    };

    const info = await transporter.sendMail(mailOption);
    console.log("Link sent successfully", info.messageId);
    return true;
  } catch (error) {
    console.log("Error in sending Link", error.message);
    return false;
  }
};

export default sendLink;
