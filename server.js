const express = require("express");
const bodyParser = require("body-parser");
require("./db/mongoose.js");
const userRouter = require("./routes/user-routes.js");
const taskRouter = require("./routes/task-routes")

const app = express();
const port = process.env.PORT || 3010;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Methods", "PATCH, DELETE")
  res.header("Access-Control-Allow-Origin", `*`);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  next();
});

app.use(userRouter);
app.use(taskRouter)

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
