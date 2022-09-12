const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

require("./connection");

const server = require("http").createServer(app);
const PORT = 8000;

server.listen(PORT, () => {
  console.log("listening to port", PORT);
});
