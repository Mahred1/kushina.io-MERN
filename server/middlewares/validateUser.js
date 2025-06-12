const JWT_PASS = "secret1234";
const jwt = require("jsonwebtoken");

function validateUser(req, res, next) {
  const token = req.headers.authorization;
  const isUser = jwt.verify(token, JWT_PASS);
  if (!isUser) {
    res.status(401).json({ error: "Token is not valid" });
  } else {
    req.currentUser = isUser;
    next();
  }
}

module.exports = validateUser;
