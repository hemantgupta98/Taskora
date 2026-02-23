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
    accessToken: pick(
      process.env.GOOGLE_ACCESS_TOKEN,
      process.env.GMAIL_ACCESS_TOKEN,
    ),
    redirectUri: pick(
      process.env.GOOGLE_REDIRECT_URI,
      process.env.GMAIL_REDIRECT_URI,
    ),
  };

  return { user, pass, from, oauth };
};

const getSmtpConfig = () => {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT || 587);
  const secure = String(process.env.SMTP_SECURE || "false") === "true";

  return {
    host,
    port,
    secure,
    connectionTimeout: Number(process.env.SMTP_CONNECTION_TIMEOUT || 20000),
    greetingTimeout: Number(process.env.SMTP_GREETING_TIMEOUT || 15000),
    socketTimeout: Number(process.env.SMTP_SOCKET_TIMEOUT || 30000),
  };
};

const hasPasswordAuth = (env) => Boolean(env.user && env.pass);
const hasOAuthAuth = (env) =>
  Boolean(
    env.user &&
    env.oauth.clientId &&
    env.oauth.clientSecret &&
    env.oauth.refreshToken,
  );

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
  const smtp = getSmtpConfig();

  const transportBase = {
    host: smtp.host,
    port: smtp.port,
    secure: smtp.secure,
    requireTLS: !smtp.secure,
    connectionTimeout: smtp.connectionTimeout,
    greetingTimeout: smtp.greetingTimeout,
    socketTimeout: smtp.socketTimeout,
    tls: {
      servername: smtp.host,
      minVersion: "TLSv1.2",
    },
  };

  if (mode === "password") {
    return nodemailer.createTransport({
      ...transportBase,
      auth: {
        user: env.user,
        pass: env.pass,
      },
    });
  }

  if (mode === "oauth2") {
    return nodemailer.createTransport({
      ...transportBase,
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

const buildAlternateTransport = () => {
  const env = getMailEnv();
  const mode = getMailAuthMode();
  const smtp = getSmtpConfig();

  const fallbackPort = smtp.port === 587 ? 465 : 587;
  const fallbackSecure = fallbackPort === 465;

  const transportBase = {
    host: smtp.host,
    port: fallbackPort,
    secure: fallbackSecure,
    requireTLS: !fallbackSecure,
    connectionTimeout: smtp.connectionTimeout,
    greetingTimeout: smtp.greetingTimeout,
    socketTimeout: smtp.socketTimeout,
    tls: {
      servername: smtp.host,
      minVersion: "TLSv1.2",
    },
  };

  if (mode === "password") {
    return nodemailer.createTransport({
      ...transportBase,
      auth: {
        user: env.user,
        pass: env.pass,
      },
    });
  }

  if (mode === "oauth2") {
    return nodemailer.createTransport({
      ...transportBase,
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
        "Mail authentication failed. Check EMAIL_APP_USER/EMAIL_APP_PASS (or EMAIL_USER/EMAIL_PASS) or OAuth credentials.",
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
      mode: "none",
      message: "Recipient email is required",
    };
  }

  const env = getMailEnv();
  const mode = getMailAuthMode();

  if (mode === "none") {
    return {
      success: false,
      reason: "mail_not_configured",
      mode,
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
        mode,
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

    if (classified.reason === "smtp_timeout") {
      try {
        const retryTransport = buildAlternateTransport();
        if (retryTransport) {
          const retryInfo = await retryTransport.sendMail({
            from: `"Taskora" <${env.from}>`,
            to: recipient,
            subject,
            text,
            html,
          });

          console.info(`[MAIL:${context}] sent after retry`, {
            mode,
            to: recipient,
            messageId: retryInfo?.messageId,
            accepted: retryInfo?.accepted,
            rejected: retryInfo?.rejected,
          });

          return {
            success: true,
            message: "Email sent successfully",
            data: {
              messageId: retryInfo?.messageId,
            },
          };
        }
      } catch (retryError) {
        const retryClassified = classifyError(retryError);
        console.error(`[MAIL:${context}] retry failed`, {
          mode,
          to: recipient,
          reason: retryClassified.reason,
          ...retryClassified.details,
        });
      }
    }

    console.error(`[MAIL:${context}] failed`, {
      mode,
      to: recipient,
      reason: classified.reason,
      ...classified.details,
    });

    return {
      success: false,
      reason: classified.reason,
      mode,
      message: classified.publicMessage,
    };
  }
};
