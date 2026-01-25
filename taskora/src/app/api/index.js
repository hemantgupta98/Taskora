dotenv.config();

// eslint-disable-next-line @typescript-eslint/no-require-imports
const app = require("./app");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const connectDB = require("./config/db");

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
