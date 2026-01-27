const corsOption = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
  credentials: true,
};

export default corsOption;
