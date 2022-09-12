import React, { useState } from "react";
import classes from "./Body.module.css";

function Body() {
  const [user, setUser] = useState("a");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

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
          <form className={classes.jobForm}>
            <div className={classes.inputControl}>
              <label>Job Title</label>
              <input
                type="text"
                placeholder="Job Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className={classes.inputControl}>
              <label>Job description</label>
              <input
                type="text"
                placeholder="Job Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <button>Post Job</button>
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
