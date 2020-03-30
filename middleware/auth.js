const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "thisismysecret");
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token
    });
    if (!user) {
      throw new Error("Incorrect Auth");
    }
    req.token = token;
    req.user = user;
    console.log;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send();
  }
};

module.exports = {
  auth
};
