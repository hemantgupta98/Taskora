import jwt from "jsonwebtoken";
import { User, googleDB } from "./auth.model.js";

export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const bearerToken =
      authHeader && authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : null;
    const cookieToken = req.cookies?.auth_token || null;
    const token = bearerToken || cookieToken;

    if (!token) {
      return res.status(401).json({ message: "Please login first" });
    }

    if (!process.env.JWT_TOKEN) {
      console.error("❌ JWT_TOKEN not set");
      return res.status(500).json({ message: "Server configuration error" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_TOKEN);
      if (!decoded?.id) {
        return res.status(401).json({ message: "Please login first" });
      }
    } catch (err) {
      return res.status(401).json({ message: "Please login first" });
    }

    // Check both user collections
    let user = await User.findById(decoded.id);
    if (!user) {
      user = await googleDB.findById(decoded.id);
    }

    if (!user) {
      return res.status(401).json({ message: "Please login first" });
    }

    req.user = {
      id: user._id,
      email: user.email,
      name: user.name,
    };
    next();
  } catch (err) {
    console.error("Auth error:", err);
    return res.status(401).json({ message: "Please login first" });
  }
};
