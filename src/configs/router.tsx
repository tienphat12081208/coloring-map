import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

// import GlobalContext from '../contexts';

const routes = [
  // Dashboards
  {
    path: "/",
    Component: lazy(() => import("../pages/Home")),
    exact: true,
  },

  // Not found router
  {
    path: "/error/404",
    Component: lazy(() => import("../pages/Error")),
    exact: true,
  },
];

const Routes = () => {
  return (
    <Router>
      <Switch>
        {routes.map(({ path, Component, exact }) => (
          <Route
            path={path}
            key={path}
            exact={exact}
            render={() => (
              <Suspense fallback={null}>
                <Component />
              </Suspense>
            )}
          />
        ))}
        <Redirect to="/error/404" />
      </Switch>
    </Router>
  );
};

export default Routes;
