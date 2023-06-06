import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Register, Login, ForgotPassword, ResetPassword, LandingPage } from "../../pages";
import MainApp from "../../pages/MainApp";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/forgotpassword">
          <ForgotPassword />
        </Route>
        <Route path="/resetpassword/:token">
          <ResetPassword />
        </Route>
        <Route path="/dashboard">
          <MainApp />
        </Route>
        <Route path="/">
          <LandingPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
