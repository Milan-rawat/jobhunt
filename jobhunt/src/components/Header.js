import React, { useState, useEffect } from "react";
import classes from "./Header.module.css";

import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Badge } from "@mui/material";

import { socket } from "../global/socket";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

function Header() {
  const [currentNotifications, setCurrentNotifications] = useState([]);
  const [unread, setUnread] = useState(0);

  // -----------------------------
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // -----------------------------

  socket.off("jobNotifications").on("jobNotifications", (jobNotification) => {
    let allCN = currentNotifications;
    allCN.push(jobNotification);
    setCurrentNotifications(allCN);

    let temp = unread + 1;
    setUnread(temp);
  });

  const fetchNotifications = async () => {
    const res = await fetch(`http://localhost:5000/notifications`, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    // const response = 
    JSON.parse(await res.text());
  };

  useEffect(() => {
    fetchNotifications();
  }, [unread]);

  return (
    <div className={classes.header}>
      <div className={classes.logo}>JobHunt</div>
      <div className={classes.navs}>
        <Badge
          badgeContent={unread}
          color="secondary"
          overlap="circular"
          style={{
            color: "red",
            margin: 15,
            cursor: "pointer",
          }}
          onClick={() => setUnread(0)}
        >
          <NotificationsIcon
            style={{
              color: "white",
              fontSize: 32,
              cursor: "pointer",
            }}
            onClick={handleClick}
          />
        </Badge>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {currentNotifications.length > 0 ? (
            currentNotifications.map((notification, i) => (
              <MenuItem
                key={i}
                onClick={() => {
                  handleClose();
                  setCurrentNotifications([]);
                }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                {notification.message}
                <p style={{ fontSize: 12 }}>
                  Title: {notification.job.title}
                </p>
                <p style={{ fontSize: 12 }}>
                  Description: {notification.job.description}
                </p>
                <p style={{ fontSize: 12 }}>
                  From: {notification.job.from}
                </p>
              </MenuItem>
            ))
          ) : (
            <MenuItem onClick={handleClose}>No New Notifications</MenuItem>
          )}
        </Menu>
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
