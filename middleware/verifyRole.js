const verifyRole = (role) => {
  return async (req, res, next) => {
    console.log(role);
    return res.sendStatus(403);
    // req.userRole = role;
    // next();
  };
};

module.exports = verifyRole;
