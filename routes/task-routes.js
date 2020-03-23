const express = require("express");
const { Task } = require("../models/task");
const router = new express.Router();
const { auth } = require("../middleware/auth");

//adds new task
router.post("/tasks", auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id
  });
  console.log(task);
  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

//Links all task to a user.
router.get("/tasks", auth, async (req, res) => {
  try {
    const response = await Task.find({ owner: req.user._id });
    res.status(200).send(response);
  } catch (error) {
    res.status(404).send(error);
  }
});

//Currently working on this
router.patch("/tasks/:id", auth, async (req, res) => {
  console.log("test")
  console.log(req.body)
  const updates = Object.keys(req.body);
  const allowedUpdates = ["totalTime"];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );
  console.log(isValidOperation)
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid update" });
  }
  console.log("test")
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id
    });
    updates.forEach(update => (task[update] = req.body[update]));
    console.log(task)

    await task.save();

    if (!task) {
      return res.status(404).send();
    }
    res.status(202).send(task);
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete({
      _id: req.params.id,
      owner: req.user._id
    });
    if (!task) {
      return res.status(404).send();
    }

    res.status(200).send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
