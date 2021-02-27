import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { useAuth } from "../../Context/AuthContext";
import { Card, CircularProgress } from "@material-ui/core";
import { database } from "../../Firebase/Firebase";
import { Link as NavigationLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    textAlign: "center",
  },
}));

export default function FullWidthGrid() {
  const classes = useStyles();
  const [userData, setUserData] = useState();
  const { currentUser, signout } = useAuth();

  async function signoutHandler() {
    await signout().then(() => {
      console.log("SignoutSucessfull");
    });
  }
  useEffect(() => {
    database.ref("users/" + currentUser.uid).once("value", function (snapshot) {
      setUserData(snapshot);
    });
  }, [currentUser.uid]);
  return userData == null ? (
    <div
      style={{
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center",
        marginTop: "40vh",
      }}
    >
      <CircularProgress />
    </div>
  ) : (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={9} sm={3}>
          <div style={{ textAlign: "Center", display: "flex" }}>
            <div>
              <div
                style={{
                  width: "300px",
                  backgroundColor: "purple",
                  height: "90vh",
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center",
                  color: "white",
                }}
              >
                {userData.val().photoURL && (
                  <img
                    style={{
                      width: "120px",
                      backgroundColor: "white",
                      margin: "100px auto 0 auto ",
                      height: "120px",
                      borderRadius: "100%",
                    }}
                    src={userData.val().photoURL}
                    alt="profile pic"
                  />
                )}

                <div>
                  <h2 style={{ textAlign: "center", alignContent: "center" }}>
                    {userData.val().userName}
                  </h2>
                  {userData.val().isMember && <h4>Gold Member</h4>}
                  <p style={{ padding: "0", margin: "0" }}>
                    {userData.val().email}
                  </p>
                </div>
                <button
                  style={{ margin: "30px 40px 0" }}
                  className="Button-edit"
                  onClick={() => {}}
                >
                  Edit Profile
                </button>
                <button
                  style={{ margin: "30px 10px 0" }}
                  className="Button"
                  onClick={signoutHandler}
                >
                  SIGN OUT
                </button>
              </div>
            </div>
            <div></div>
          </div>
        </Grid>
        <Grid item xs={12} sm={9}>
          <h2>Courses Enrolled</h2>
          {userData.val().courses ? (
            <Grid container>
              {Object.keys(userData.val().courses).map((course) => (
                <Grid item sm={4}>
                  <Card
                    style={{
                      margin: "10px",
                      textAlign: "center",
                      border: "1px solid #ccc",
                    }}
                  >
                    <h3>{course}</h3>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <div>
              <h1>You are Not Enrolled for any Course</h1>
              <h3>Please Enroll Now</h3>
              <NavigationLink className="nav-link" to="/enroll-now">
                ENROLL NOW
              </NavigationLink>
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

// import { CircularProgress, Grid } from "@material-ui/core";
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useAuth } from "../../Context/AuthContext";
//
// import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

// export default function Profile() {

//   return (
//     <div>
//       <Grid container spacing={3}>
//         <Grid item xs={12}>
//           <Paper className={classes.paper}>xs=12</Paper>
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <Paper className={classes.paper}>xs=12 sm=6</Paper>
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <Paper className={classes.paper}>xs=12 sm=6</Paper>
//         </Grid>
//         <Grid item xs={6} sm={3}>
//           <Paper className={classes.paper}>xs=6 sm=3</Paper>
//         </Grid>
//         <Grid item xs={6} sm={3}>
//           <Paper className={classes.paper}>xs=6 sm=3</Paper>
//         </Grid>
//         <Grid item xs={6} sm={3}>
//           <Paper className={classes.paper}>xs=6 sm=3</Paper>
//         </Grid>
//         <Grid item xs={6} sm={3}>
//           <Paper className={classes.paper}>xs=6 sm=3</Paper>
//         </Grid>
//       </Grid>
//     </div>
//   );
// userData ? (

// ) : (
//   <CircularProgress />
// );
// }
// {
/*  */
// }
