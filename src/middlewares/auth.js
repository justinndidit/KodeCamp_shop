const jwt = require("jsonwebtoken");

const signToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET);
};

const authorized = (role) => {
  return (req, res, next) => {
    //console.log(req.user["user"]["role"]);
    if (req.user["user"]["role"] !== role) {
      return res.status(403).json({ message: "action-not-allowed" });
    }
    next();
  };
};

const verifyToken = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (res.cookies.jwt) {
    token = res.cookies.jwt;
  }

  if (!token) {
    return res
      .status(403)
      .json({ message: "No token provided, Kindly Log in" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "You do not have access" });
    req.user = decoded;
    next();
  });
};

module.exports = {
  authorized,
  verifyToken,
  signToken,
};
