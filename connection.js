const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/jobhunt", () => {
  console.log("connected to mongodb");
});
