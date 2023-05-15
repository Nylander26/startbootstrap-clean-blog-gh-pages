const User = require("../models/users");

const authMiddleware = async (req, res, next) => {
  const userId = req.session.userId;

  await User.findById( userId ).then((id) => {
    if (id) {
      next();
    } else {
      console.log("Must login before continue...");
      res.redirect("/auth/login");
    }
  });
};

module.exports = authMiddleware;
