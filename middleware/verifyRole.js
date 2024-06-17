const RoleModel = require("../models/Role");

const verifyRole = (verifyRoleName) => {
  return async (req, res, next) => {
    const role = await RoleModel.findById(req.userAuthInfo.role, "name");
    if (verifyRoleName.includes(role.name)) {
      next();
    } else {
      return res.status(403).json({ error: "Unauthorized Access" });
    }
  };
};

module.exports = { verifyRole };

// admin role : 666edcb37110aa7008b7f1d2
// executor role : 666edcc37110aa7008b7f1d3
