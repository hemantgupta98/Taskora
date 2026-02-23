import nodemailer from "nodemailer";

const pick = (...values) => values.find((value) => String(value || "").trim());

const getMailEnv = () => {
  const user = pick(process.env.EMAIL_APP_USER, process.env.EMAIL_USER);
  const pass = pick(process.env.EMAIL_APP_PASS, process.env.EMAIL_PASS);
  const from = pick(process.env.EMAIL_FROM, user);

  const oauth = {
    clientId: pick(process.env.GOOGLE_CLIENT_ID, process.env.GMAIL_CLIENT_ID),
    clientSecret: pick(
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GMAIL_CLIENT_SECRET,
    ),
    refreshToken: pick(
      process.env.GOOGLE_REFRESH_TOKEN,
      process.env.GMAIL_REFRESH_TOKEN,
    ),
    accessToken: pick(process.env.GOOGLE_ACCESS_TOKEN, process.env.GMAIL_ACCESS_TOKEN),
    redirectUri: pick(process.env.GOOGLE_REDIRECT_URI, process.env.GMAIL_REDIRECT_URI),
  };

  return { user, pass, from, oauth };
};

const hasPasswordAuth = (env) => Boolean(env.user && env.pass);
const hasOAuthAuth = (env) =>
  Boolean(env.user && env.oauth.clientId && env.oauth.clientSecret && env.oauth.refreshToken);

const getMailAuthMode = () => {
  const env = getMailEnv();
  if (hasPasswordAuth(env)) return "password";
  if (hasOAuthAuth(env)) return "oauth2";
  return "none";
};

export const isMailConfigured = () => getMailAuthMode() !== "none";

const buildTransport = () => {
  const env = getMailEnv();
  const mode = getMailAuthMode();

  if (mode === "password") {
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: env.user,
        pass: env.pass,
      },
    });
  }

  if (mode === "oauth2") {
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: env.user,
        clientId: env.oauth.clientId,
        clientSecret: env.oauth.clientSecret,
        refreshToken: env.oauth.refreshToken,
        accessToken: env.oauth.accessToken,
      },
    });
  }

  return null;
};

let transporter;
const getTransporter = () => {
  if (!transporter) {
    transporter = buildTransport();
  }

  return transporter;
};

const classifyError = (error) => {
  const code = error?.code;
  const responseCode = error?.responseCode;
  const message = String(error?.message || "");
  const response = String(error?.response || "");
  const command = String(error?.command || "");

  const details = {
    code,
    responseCode,
    command,
    response,
    message,
  };

  if (code === "EAUTH" || responseCode === 535) {
    return {
      reason: "auth_failed",
      publicMessage:
        "Mail authentication failed. Check EMAIL_USER/EMAIL_PASS or OAuth credentials.",
      details,
    };
  }

  if (message.includes("invalid_grant") || response.includes("invalid_grant")) {
    return {
      reason: "oauth_invalid_grant",
      publicMessage:
        "Google OAuth token is invalid/expired. Check refresh token and consent.",
      details,
    };
  }

  if (message.includes("invalid_scope") || response.includes("invalid_scope")) {
    return {
      reason: "oauth_invalid_scope",
      publicMessage:
        "Google OAuth scope is invalid. Ensure Gmail scope is allowed in Google Cloud consent screen.",
      details,
    };
  }

  if (
    message.includes("redirect_uri_mismatch") ||
    response.includes("redirect_uri_mismatch")
  ) {
    return {
      reason: "oauth_redirect_uri_mismatch",
      publicMessage:
        "Google OAuth redirect URI mismatch. Verify local + production redirect URIs in Google Cloud.",
      details,
    };
  }

  if (code === "ETIMEDOUT" || code === "ESOCKET") {
    return {
      reason: "smtp_timeout",
      publicMessage: "Mail server timeout. Please try again.",
      details,
    };
  }

  if (responseCode === 550 || responseCode === 553 || code === "EENVELOPE") {
    return {
      reason: "recipient_rejected",
      publicMessage: "Recipient email was rejected by provider.",
      details,
    };
  }

  return {
    reason: "unknown_mail_error",
    publicMessage: "Email delivery failed.",
    details,
  };
};

export const sendMailSafe = async ({ to, subject, text, html, context }) => {
  const recipient = String(to || "")
    .trim()
    .toLowerCase();

  if (!recipient) {
    return {
      success: false,
      reason: "recipient_missing",
      message: "Recipient email is required",
    };
  }

  const env = getMailEnv();
  const mode = getMailAuthMode();

  if (mode === "none") {
    return {
      success: false,
      reason: "mail_not_configured",
      message:
        "Email service is not configured. Set EMAIL_USER/EMAIL_PASS or Google OAuth mail credentials.",
      debug: {
        hasEmailUser: Boolean(env.user),
        hasEmailPass: Boolean(env.pass),
        hasClientId: Boolean(env.oauth.clientId),
        hasClientSecret: Boolean(env.oauth.clientSecret),
        hasRefreshToken: Boolean(env.oauth.refreshToken),
        hasRedirectUri: Boolean(env.oauth.redirectUri),
      },
    };
  }

  try {
    const tx = getTransporter();

    if (!tx) {
      return {
        success: false,
        reason: "transporter_init_failed",
        message: "Email transporter initialization failed",
      };
    }

    const mailOptions = {
      from: `"Taskora" <${env.from}>`,
      to: recipient,
      subject,
      text,
      html,
    };

    const info = await tx.sendMail(mailOptions);

    console.info(`[MAIL:${context}] sent`, {
      mode,
      to: recipient,
      messageId: info?.messageId,
      accepted: info?.accepted,
      rejected: info?.rejected,
    });

    return {
      success: true,
      message: "Email sent successfully",
      data: {
        messageId: info?.messageId,
      },
    };
  } catch (error) {
    const classified = classifyError(error);

    console.error(`[MAIL:${context}] failed`, {
      mode,
      to: recipient,
      reason: classified.reason,
      ...classified.details,
    });

    return {
      success: false,
      reason: classified.reason,
      message: classified.publicMessage,
    };
  }
};
