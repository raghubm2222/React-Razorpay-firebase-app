import React from "react";
import { useAuth } from "../../Context/AuthContext";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "../Pages/Home";
import Signup from "../Auth/Signup";
import Enrollnow from "../Pages/Enrollnow";
import Membership from "../Pages/Membership";
import Profile from "../Pages/Profile";
import Navbar from "../NavBar";
import Login from "../../components/Auth/Login";
import Aboutus from "../Pages/AboutUs";
import Orders from "../Management/Orders";
import Refferal from "../Management/Refferals";

const AppRouter = (props) => {
  const { currentUser } = useAuth();
  let Routers = (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route exact path="/enroll-now" component={Enrollnow} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/membership" component={Membership} />
      <Route exact path="/aboutus" component={Aboutus} />
      <Redirect to="/signup" />
    </Switch>
  );
  if (currentUser !== null) {
    Routers = (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/enroll-now" component={Enrollnow} />
        <Route path="/profile" component={Profile} />
        <Route path="/membership" component={Membership} />
        <Route exact path="/aboutus" component={Aboutus} />
        <Route exact path="/management/orders" component={Orders} />
        <Route exact path="/management/refferal" component={Refferal} />
        <Redirect to="/" />
      </Switch>
    );
  }
  return (
    <BrowserRouter>
      <Navbar />

      {Routers}
    </BrowserRouter>
  );
};
export default AppRouter;
