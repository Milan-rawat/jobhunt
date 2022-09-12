import React from "react";
import classes from "./Header.module.css";

import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Badge } from "@mui/material";

function Header() {
  return (
    <div className={classes.header}>
      <div className={classes.logo}>JobHunt</div>
      <div className={classes.navs}>
        <Badge
          badgeContent={4}
          color="secondary"
          overlap="circular"
          style={{
            color: "red",
            margin: 15,
            cursor: "pointer",
          }}
        >
          <NotificationsIcon
            style={{
              color: "white",
              fontSize: 32,
              cursor: "pointer",
            }}
          />
        </Badge>
        <AccountCircleIcon
          style={{
            color: "white",
            fontSize: 32,
            margin: 15,
            cursor: "pointer",
          }}
        />
      </div>
    </div>
  );
}

export default Header;
