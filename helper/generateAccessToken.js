const jwt = require("jsonwebtoken");

const generateAccessToken = (payload) => {
  console.log(payload);
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1h" });
};

module.exports = { generateAccessToken };
