const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const verifyToken = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).json({
      ok: false,
      data: null,
      error: "Acceso denegado",
    });
  }
  const session = User.findOne({ token: token });
  if (!session) {
    return res.status(401).json({
      ok: false,
      data: null,
      error: "Acceso denegado",
    });
  }
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = jwt.decode(token);
    next();
  } catch (error) {
    return res.status(400).json({
      ok: false,
      data: null,
      error: "Acceso denegado",
    });
  }
};
module.exports = verifyToken;
