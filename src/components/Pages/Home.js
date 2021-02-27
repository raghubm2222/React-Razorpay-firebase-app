import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ReactPlayer from "react-player";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: "150px 50px",
    textAlign: "center",
    color: theme.palette.text.secondary,
    border: "none",
  },
  paperr: {
    padding: "150px 50px",
    textAlign: "left",
    color: "black",
    border: "none",
    fontWeight: "bold",
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <div className={classes.paperr}>
            <h3>Its never too late to start ---</h3>
            <h2>Why let your Zest towards learning fade away?</h2>
            <h1 style={{ color: "#8b0000", fontSize: "3rem" }}>
              Grab our Gold membership and start your Career at Rai.
            </h1>
            <h1>
              Get
              <strong style={{ color: "#8b0000" }}> placed </strong>
              first and <strong style={{ color: "#8b0000" }}>
                {" "}
                placed{" "}
              </strong>{" "}
              pay later.
            </h1>
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div className={classes.paper}>
            <ReactPlayer url="https://www.youtube.com/watch?v=K4DyBUG242c" />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
