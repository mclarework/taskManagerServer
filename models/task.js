const mongoose = require("mongoose");

const instances = new mongoose.Schema({
    timeStarted: {
        type:Date
    },
    timeRan:{
        type:Number
    }
})
const taskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    default: false
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  runTime: [instances],
  totalTime: {
      type:Number,
      default: 0
  }
});
const Task = mongoose.model("Task", taskSchema);

module.exports = {
  Task
};
