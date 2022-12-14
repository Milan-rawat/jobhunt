import React, { useState, useEffect } from "react";
import classes from "./Body.module.css";
import { socket } from "../global/socket";

function Body() {
  const [user, setUser] = useState("a");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [jobs, setJobs] = useState([]);

  const addJob = async (e) => {
    e.preventDefault();
    // const res = await fetch(`http://localhost:8000/job`, {
    //   method: "post",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     title: title,
    //     description: description,
    //     from: user,
    //   }),
    // });
    // const response = JSON.parse(await res.text());

    socket.emit("postJob", { title, description, user });
    // if (response) {
    setTitle("");
    setDescription("");
    alert("Job Added");
    // }
  };

  const fetchJobs = async () => {
    const res = await fetch(`http://localhost:5000/job`, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const response = JSON.parse(await res.text());
    setJobs(response);
  };

  useEffect(() => {
    fetchJobs();
    // changeUserHandler(user);
    socket.emit("changeUser", { userTo: user, userFrom: null });
  }, [user]);

  const acceptJob = (job) => {
    socket.emit("acceptJob", { job, acceptedBy: user });
  };
  const changeUserHandler = (userTo) => {
    if (userTo !== user) {
      socket.emit("changeUser", { userTo, userFrom: user });
      setUser(userTo);
    }
  };

  return (
    <>
      <div className={classes.userSelection}>
        <div
          className={`${classes.user} ${user === "a" ? classes.active : null}`}
          onClick={() => changeUserHandler("a")}
        >
          A
        </div>
        <div
          className={`${classes.user} ${user === "b" ? classes.active : null}`}
          onClick={() => changeUserHandler("b")}
        >
          B
        </div>
        <div
          className={`${classes.user} ${user === "c" ? classes.active : null}`}
          onClick={() => changeUserHandler("c")}
        >
          C
        </div>
      </div>
      {user === "a" && (
        <div className={`${classes.jobFormBox} ${classes.bodyBox}`}>
          <form className={classes.jobForm} onSubmit={addJob}>
            <div className={classes.inputControl}>
              <label>Job Title</label>
              <input
                type="text"
                placeholder="Job Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className={classes.inputControl}>
              <label>Job description</label>
              <input
                type="text"
                placeholder="Job Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <button type="submit">Post Job</button>
          </form>
        </div>
      )}
      {(user === "b" || user === "c") && (
        <div className={`${classes.jobPosts} ${classes.bodyBox}`}>
          <div className={classes.jobCardBox}>
            {jobs.map((job, idx) => (
              <div key={idx} className={classes.jobCard}>
                <h1>{job.title}</h1>
                <h4>{job.description}</h4>
                <p>From :- {job.from}</p>
                <button onClick={() => acceptJob(job)}>Accept Job</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Body;
