const express = require("express");
const { User } = require("../models/user");
const router = new express.Router();
const { auth } = require("../middleware/auth");

//add user
router.post("/users", async (req, res) => {
  const user = new User(req.body);
  const token = await user.generateAuthToken();
  try {
    await user.save();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

//user login
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();

    res.send({
      loggedIn: true,
      user: user,
      token: token
    });
  } catch (error) {
    res.send({
      loggedIn: false,
    });
  }
});

//user logout
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send("successfully logged out");
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
