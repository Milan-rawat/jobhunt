const router = require("express").Router();
const Job = require("../models/jobModel");

// creating user
router.post("/", async (req, res) => {
  try {
    const { title, description, from } = req.body;
    const job = await Job.create({ title, description, from });
    res.status(201).json(job);
  } catch (e) {
    res.status(500).json({ msg: "Something went wrong" });
  }
});

module.exports = router;
