const mongoose = require("mongoose");

const connection = async () => {
  const uri =
    "mongodb+srv://mike:mike@groupproject-g8ze5.mongodb.net/GGW?retryWrites=true&w=majority";

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log("connection made");
  } catch (error) {
    console.log(error);
  }
};

connection();

module.exports = {
  mongoose
};
