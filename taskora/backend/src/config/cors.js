const corsOption = {
  origin: ["http://localhost:3000", "https://taskora-peach.vercel.app"],
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
  credentials: true,
};

export default corsOption;
