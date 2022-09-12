const express = require("express");
const app = express();
const cors = require("cors");
const jobRouter = require("./routes/jobRoutes");

const server = require("http").createServer(app);
const PORT = 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

require("./connection");

app.use("/job", jobRouter);

server.listen(PORT, () => {
  console.log("listening to port", PORT);
});
