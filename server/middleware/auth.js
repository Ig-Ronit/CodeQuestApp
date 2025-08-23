import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    // Check if Authorization header exists
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      console.error("Authorization header is missing");
      return res.status(401).json({ message: "Authorization required" });
    }

    // Check if Authorization header starts with 'Bearer '
    if (!authHeader.startsWith("Bearer ")) {
      console.error("Authorization header format is incorrect");
      return res.status(400).json({ message: "Invalid Authorization format" });
    }

    // Extract token from Authorization header
    const token = authHeader.replace("Bearer ", "");

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Log the decoded token (for debugging purposes)
    console.log("Decoded token:", decoded);

    // Attach user ID to the request object for use in the next middleware
    req.userId = decoded.id;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Auth middleware error:", error.message);

    // Handle different types of errors
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired" });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    } else {
      // Generic error message for any other issues
      return res.status(500).json({ message: "Internal server error" });
    }
  }
};

export default auth;
