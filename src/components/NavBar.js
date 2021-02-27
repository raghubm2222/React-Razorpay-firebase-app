import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { useAuth } from "../Context/AuthContext";
import { Link as NavigationLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    paddingLeft: "20px",
    flexGrow: 1,
    color: "black",
    fontSize: "2rem",
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const { currentUser } = useAuth();

  return (
    <AppBar position="static" style={{ backgroundColor: "white" }}>
      <Toolbar>
        <h1
          className={classes.title}
          style={{ fontWeight: "bold", color: "#8b0000" }}
        >
        Company Name
        </h1>
        <div>
          <NavigationLink className="nav-link" to="/home">
            HOME
          </NavigationLink>
          <NavigationLink className="nav-link" to="/enroll-now">
            ENROLL NOW
          </NavigationLink>
          <NavigationLink className="nav-link" to="/membership">
            MEMBERSHIP
          </NavigationLink>
          <NavigationLink className="nav-link" to="/aboutus">
            ABOUT US
          </NavigationLink>
        </div>
        <NavigationLink
          className="nav-link-button"
          to={currentUser ? "/profile" : "/login"}
          variant="contained"
          color="primary"
        >
          {currentUser ? "Profile" : "Login/Signup"}
        </NavigationLink>
      </Toolbar>
    </AppBar>
  );
}
