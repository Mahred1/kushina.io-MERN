const jwt = require("jsonwebtoken");
const JWT_PASS = "secret1234";
function validateAdmin(req, res, next) {
  const token = req.headers.authorization;
  const isAdmin = jwt.verify(token, JWT_PASS);

  if (!isAdmin) {
    res.status(500).json({ error: "token is not valid" });
    return;
  }
  console.log(!isAdmin)
  if (!(isAdmin.role === "admin")) {
    res.status(401).json({ error: "You are not an admin(Unauthorized)" });
  } else {
    req.currentUser = isAdmin;
    next();
  }
}

module.exports = validateAdmin;
