const { generateAccessToken } = require("../helper/generateAccessToken");
const UserModel = require("../models/User");
const bcrypt = require("bcryptjs");

const registration = async (req, res, next) => {
  const { name, email, password, designation, role } = req.body;
  try {
    const user = new UserModel({ name, email, password, designation, role });
    await user.save();
    res.status(201).send("User registered");
  } catch (err) {
    res.status(400).json({ error: "Registration Failed! Try Again." });
  }
};

const login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send("Invalid credentials");
    }
    const accessToken = generateAccessToken({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      passowrd: "🤫",
    });
    await user.save();
    await user.populate("role");
    res.json({
      user: { ...user.toJSON(), password: "🤫" },
      accessToken,
    });
  } catch (err) {
    res.status(400).json({ error: "Authentication failed!" });
  }
};

const refresh = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.sendStatus(401);
  try {
    const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
    const user = await UserModel.findById(decoded.id);
    if (!user || user.refreshToken !== refreshToken) return res.sendStatus(403);
    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);
    user.refreshToken = newRefreshToken;
    await user.save();
    res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  } catch (err) {
    res.sendStatus(403);
  }
};

module.exports = { login, registration, refresh };
