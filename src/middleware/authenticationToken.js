const jwt = require("jsonwebtoken");
const tokenSecret = "supersecrettoken";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Access denied. No token provided." });

  jwt.verify(token, tokenSecret, (err, user) => {
    if (err) return res.status(401).json({ error: "Invalid token." });
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;