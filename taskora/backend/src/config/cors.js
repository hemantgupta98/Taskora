const configuredOrigins = [
  process.env.FRONTEND_URL,
  ...(process.env.FRONTEND_URLS || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean),
  "http://localhost:3000",
  "https://taskora-peach.vercel.app",
].filter(Boolean);

const allowedOrigins = [...new Set(configuredOrigins)];

const corsOption = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
  credentials: true,
};

export default corsOption;
