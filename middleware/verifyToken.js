const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");

const verifyToken = () => {
  return async (req, res, next) => {
    const authToken = req.headers.authorization.split(" ")[1];
    let decodeUser = jwt.verify(authToken, process.env.SECRET_KEY);
    let user = await UserModel.findById(decodeUser._id);
    if (user) {
      req.userAuthInfo = user;
      next();
    } else {
      return res.sendStatus(403);
    }
  };
};

module.exports = { verifyToken };
