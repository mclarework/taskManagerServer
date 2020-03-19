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
    type: String
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
      type:Number
  }
});
const Task = mongoose.model("Task", taskSchema);

module.exports = {
  Task
};
