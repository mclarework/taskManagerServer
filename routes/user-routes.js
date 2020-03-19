const express = require("express");
const { User } = require("../models/user");
const router = new express.Router();
const { auth } = require("../middleware/auth");

    router.post("/users", async (req, res) => {
        const user = new User(req.body);
        const token = await user.generateAuthToken();
        try {
        await user.save();
        res.status(201).send({user, token});
        } catch (error) {
        res.status(400).send(error);
        }
    });
  

    router.get("/users/me", auth, async (req, res) => {
        res.send(req.user);
    })

    router.get("/users", async (req, res) => {
      try {
        const response = await User.find({});
        res.status(200).send(response);
      } catch (error) {
        res.status(404).send(error);
      }
    });
    
    router.get("/users/:id", async (req, res) => {
      try {
        const user = await User.findOne({ _id: req.params.id });
        if (!user) {
          console.log("no user found");
          return res.status(404).send("No User Found");
        }
        res.status(200).send(user);
      } catch (error) {
        res.status(500).send(error);
      }
    });

    router.post("/users/login", async (req, res) => {
        try {
            const user = await User.findByCredentials(req.body.email, req.body.password)
            const token = await user.generateAuthToken();

            res.send({
                user: user,
                token: token
            })
        } catch (error) {
            res.status(400).send(error)
        }
    })

    router.post("/users/logout", auth, async (req, res) => {
        try {
            req.user.tokens = req.user.tokens.filter(token => {
                return token.token !== req.token;
            })
            await req.user.save()
            res.send("successfully logged out")
        } catch (error) {
            res.status(500).send()
        }
    })

module.exports = router

