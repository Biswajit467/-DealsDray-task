const express = require("express");
const app = express();
const path = require("path");
const port = 3000;
const { connectToMongoDB } = require("./connection");
// const login = require("./models/login");
const loginRouter = require("./routes/login");
const employeeRouter = require("./routes/employee");

connectToMongoDB("mongodb://127.0.0.1:27017/task-db").then(() =>
  console.log("mongoDB Connected")
);

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api", loginRouter);
app.use("/api", employeeRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
