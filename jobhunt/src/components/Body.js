import React, { useState } from "react";
import classes from "./Body.module.css";

function Body() {
  const [user, setUser] = useState("a");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const addJob = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:8000/job`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        description: description,
        from: user,
      }),
    });
    const response = JSON.parse(await res.text());
    setTitle("");
    setDescription("");
    alert("Job Added");
  };

  return (
    <>
      <div className={classes.userSelection}>
        <div
          className={`${classes.user} ${user === "a" ? classes.active : null}`}
          onClick={() => setUser("a")}
        >
          A
        </div>
        <div
          className={`${classes.user} ${user === "b" ? classes.active : null}`}
          onClick={() => setUser("b")}
        >
          B
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
      {user === "b" && (
        <div className={`${classes.jobPosts} ${classes.bodyBox}`}>
          Job Posts
        </div>
      )}
    </>
  );
}

export default Body;
