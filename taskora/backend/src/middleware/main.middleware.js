import jwt from "jsonwebtoken";
import User from "../modules/auth/auth.model"; // adjust path

export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authorization token missing",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_TOKEN);

    // 🔐 DB verification
    const user = await User.findById(decoded.id).select("_id email");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User no longer exists",
      });
    }

    req.user = {
      id: user._id,
      email: user.email,
    };

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message:
        err.name === "TokenExpiredError" ? "Token expired" : "Invalid token",
    });
  }
};
