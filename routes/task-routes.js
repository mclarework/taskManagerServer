const express = require("express");
const { Task, Instance } = require("../models/task");
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

//Updates total time
router.patch("/tasks/total/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["totalTime"];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid update" });
  }
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id
    });
    updates.forEach(update => (task[update] = req.body[update]));

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

//adds individual runs of the timer to an array
router.patch("/tasks/instance/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["timeStarted", "timeRan"];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid update" });
  }
  const instance = new Instance({
    timeStarted: req.body.timeStarted,
    timeRan: req.body.timeRan
  });
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id
    });
    task.runTime.push(instance);
    console.log(task);
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

//Needs reviewing
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
