import jwt from "jsonwebtoken";

export const githubAuth = (req, res, next) => {
  try {
    if (!req.cookies) {
      return res.status(401).json({ message: "Cookies not found" });
    }

    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_TOKEN);

    if (decoded.provider !== "github") {
      return res.status(401).json({ message: "Invalid provider" });
    }

    req.githubToken = decoded.githubToken;
    next();
  } catch (err) {
    console.error("GitHub auth error:", err.message);
    return res.status(401).json({ message: "Auth failed" });
  }
};
