import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Card } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "0 150px",
  },
  paper: {
    border: "none",
    margin: "10px",
    textAlign: "Left",
    padding: "10px",
  },
}));

export default function Membership() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card className={classes.paper}>
            <h1>Gold Membership</h1>
            <ul>
              <li>It is basically a gate pass to a free training program.</li>
              <li>
                Once you get registered for the gold membership you will be
                having certified internship for 4 weeks. In this internship
                there will be assignments and tests, and students who excel in
                this tests and assignments with minimum of 90% marks.
              </li>
              <li>
                This training will be immense and our domain experts with more
                than 10+ years of experience will teach all the related topics
                and you can practical experience it.
              </li>
              <li>
                You get to do ongoing projects from various companies and apart
                from technical training there will be personality development
                classes to enhance your skills.
              </li>
              <li>
                Once the training is completed you will get to attend the
                interviews from top companies. Package starts from 2 LPA to 12
                LPA.
              </li>
              <li>
                There will be 100% placements and once you get placed, you can
                pay the training fee. Get placed first and pay later.
              </li>
              <li>
                Students who didn’t get selected for the free training will have
                membership with us for 1 year. They will be getting job updates
                in NON IT field i.e, Marketing, Finance, HR, Banking, Business
                development,Tech support etc.. This is a great time and
                opportunity to upskill yourself and to stand out from the crowd.
                So what is holding you back, register for our gold membership
                today.
              </li>
            </ul>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card className={classes.paper}>
            <h1>Diamond Membership</h1>
            <ul>
              <li>
                In Diamond Membership we offer training program for students who
                didn’t get selected for the free training program through gold
                membership. Students will get another opportunity to get
                trained.
              </li>
              <li>
                Register for our Diamond Membership where in you will get
                expertized training on your choice of trend with 100%
                placements. Registration fee is 30,000 rupees and once the
                training is done, you will be getting placed in top companies
                with minimum package of 2 LPA to 12 LPA.
              </li>
            </ul>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card className={classes.paper} style={{ padding: "15px" }}>
            <h1>Platinum Membership</h1>
            <h2 style={{ color: "#8b000" }}>
              Students registered for the gold membership and undergoing free
              training program will be eligible for the Platinum Membership.
            </h2>
            <ul>
              <li>
                You will be getting placed in a reputed company with package
                2-12 LPA.
              </li>
            </ul>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
