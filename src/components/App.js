import { React, useContext, useEffect, createElement } from "react";
import Login from "../pages/login/Login";
import Layout from "./Layout/Layout";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { Context as UserContext } from "../context/UserContext";

const App = () => {
  const {
    state: { isAuthenticated },
    userAuthenticate,
  } = useContext(UserContext);
  useEffect(() => {
    userAuthenticate();
  }, []);
  console.log(isAuthenticated);
  return (
    <div>
      <HashRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <Redirect to="/app/products" />}
          />
          <Route
            exact
            path="/app"
            render={() => <Redirect to="/app/products" />}
          />
          <PrivateRoute path="/app" component={Layout} />
          <PublicRoute path="/login" component={Login} />
          <Route component={Error} />
        </Switch>
      </HashRouter>
    </div>
  );
  function PrivateRoute({ component, ...rest }) {
    if (isAuthenticated === undefined) {
      return null;
    }
    return (
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated ? (
            createElement(component, props)
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          )
        }
      />
    );
  }

  function PublicRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated ? (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          ) : (
            createElement(component, props)
          )
        }
      />
    );
  }
};

export default App;
