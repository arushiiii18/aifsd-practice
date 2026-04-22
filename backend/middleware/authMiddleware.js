const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "No token, unauthorized" });
    }

    const realToken = token.split(" ")[1]; // IMPORTANT (Bearer fix)

    const decoded = jwt.verify(realToken, process.env.JWT_SECRET);
    req.user = decoded.id;

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};