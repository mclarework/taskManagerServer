const mongoose = require("mongoose");

const instances = new mongoose.Schema({
    timeStarted: {
        type:Number
    },
    timeRan:{
        type:Number,
        default:0
    },
    active:{
      type:Boolean,
      default:false
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
const Instance = mongoose.model("Instance",instances)

module.exports = {
  Task,
  Instance
};
