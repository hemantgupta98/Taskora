import jwt from "jsonwebtoken";
import { User, googleDB } from "../modules/auth/auth.model.js";

export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.warn(
        "❌ AUTH ERROR: Missing or invalid Authorization header format",
      );
      return res.status(401).json({
        success: false,
        message: "Authorization token missing",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!process.env.JWT_TOKEN) {
      console.error("❌ CRITICAL: JWT_TOKEN environment variable not set");
      return res.status(500).json({
        success: false,
        message: "Server configuration error",
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_TOKEN);
    } catch (verifyErr) {
      console.warn(`❌ JWT verification failed: ${verifyErr.message}`);
      return res.status(401).json({
        success: false,
        message:
          verifyErr.name === "TokenExpiredError"
            ? "Token expired - please login again"
            : "Invalid token signature - please login again",
      });
    }

    // 🔐 DB verification - Check both collections
    let user = await User.findById(decoded.id).select("_id email name");

    // If not found in SignupHistory, check googlelogin
    if (!user) {
      user = await googleDB.findById(decoded.id).select("_id email name");
    }

    if (!user) {
      console.warn(
        `❌ AUTH ERROR: User ${decoded.id} not found in any collection`,
      );
      return res.status(401).json({
        success: false,
        message: "User no longer exists - please login again",
      });
    }

    req.user = {
      id: user._id,
      email: user.email,
      name: user.name,
    };

    next();
  } catch (err) {
    console.error("❌ UNEXPECTED AUTH ERROR:", err);
    return res.status(401).json({
      success: false,
      message: "Authentication failed",
    });
  }
};
