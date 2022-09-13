const router = require("express").Router();
const Notification = require("../models/notificationModel");

// creating user
// router.post("/", async (req, res) => {
//   try {
//     const { title, description, from } = req.body;
//     const job = await Job.create({ title, description, from });
//     res.status(201).json(job);
//   } catch (e) {
//     res.status(500).json({ msg: "Something went wrong" });
//   }
// });

router.get("/", async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.status(201).json(notifications);
  } catch (e) {
    res.status(500).json({ msg: "Something went wrong" });
  }
});

module.exports = router;
