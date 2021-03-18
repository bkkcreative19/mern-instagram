import "./App.scss";
import React, { lazy, Suspense, useContext, useEffect } from "react";
import * as ROUTES from "./constants/routes";
import { Switch, Route } from "react-router-dom";
import { Context } from "./context/context";

const Login = lazy(() => import("./pages/Login/Login"));
const SignUp = lazy(() => import("./pages/SignUp/SignUp"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const Profile = lazy(() => import("./pages/Profile/Profile"));

const App = () => {
  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <Switch>
          <Route exact path={ROUTES.LOGIN} component={Login} />
          <Route exact path={ROUTES.SIGN_UP} component={SignUp} />
          <Route exact path={ROUTES.DASHBOARD} component={Dashboard} />
          <Route exact path={ROUTES.PROFILE} component={Profile} />
        </Switch>
      </Suspense>
    </>
  );
};

export default App;
