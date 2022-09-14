const express = require("express");
const app = express();
const cors = require("cors");
const jobRouter = require("./routes/jobRoutes");
const notificationRouter = require("./routes/notificationRoutes");
const Job = require("./models/jobModel");
const Notification = require("./models/notificationModel");

const server = require("http").createServer(app);
const PORT = 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

require("./connection");

const io = require("socket.io")(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("postJob", async ({ title, description, user }) => {
    const job = await Job.create({ title, description, from: user });

    const newNotification = await Notification.create({
      message: "You have a new Job Suggestion",
      job: job._id,
    });
    const notification = await Notification.findOne({
      _id: newNotification._id,
    }).populate("job");
    socket.broadcast.emit("jobNotifications", notification);
  });

  socket.on("acceptJob", async ({ job }) => {
    const newNotification = await Notification.create({
      message: "Job Accepted!",
      job: job._id,
    });
    const notification = await Notification.findOne({
      _id: newNotification._id,
    }).populate("job");

    socket.broadcast.emit("acceptNotification", notification);
  });
});

app.use("/job", jobRouter);
app.use("/notifications", notificationRouter);

server.listen(PORT, () => {
  console.log("listening to port", PORT);
});
