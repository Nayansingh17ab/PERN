import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_super_secret_jwt_key_change_in_production";

// ========================================
// Authentication Middleware
// ========================================
export const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ error: "No token provided. Authentication required." });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Contains { id, role }
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

// Export as authenticateToken as well (alias for compatibility)
export const authenticateToken = verifyToken;

// ========================================
// Admin Authorization Middleware
// ========================================
export const requireAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: "Authentication required" });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Admin access required" });
  }

  next();
};

// Export as isAdmin as well (alias for compatibility)
export const isAdmin = requireAdmin;
