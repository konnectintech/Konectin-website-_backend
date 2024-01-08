const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtSign = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });
};

const jwtVerify = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return false;
  }
};

const verifyUserToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    let user;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      user = jwtVerify(token);
      if (!user) {
        return res.status(400).json({ message: "Please login again" });
      }
      if (req.query.userId && user._id != req.query.userId) {
        return res.status(401).json({ message: "Invalid access token" });
      }
      req.user = user;
      next();
    } else {
      return res
        .status(400)
        .json({
          message:
            "An access token is required to proceed, please login to get one",
        });
    }
  } catch (err) {
    return res.status(500).json({ message: "An error occured", Error: err });
  }
};

module.exports = {
  jwtSign,
  verifyUserToken,
};
