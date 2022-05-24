import React from "react";
import { AppWrapper } from "./App.style";
import NavBar from "../../core/navbar/NavBar";
import { Route, Switch } from "react-router-dom";
import routes from "../../../routes/routes";

const App = () => {
  const renderedRoutes = routes.map((route) => (
    <Route component={route.component} exact path={route.path} />
  ));
  // The NavBar component will live at the top of every page
  // The switch renders the appropriate component (page) for the appropriate path
  return (
    <div className="App">
      <AppWrapper>
        <NavBar />
        <Switch>{renderedRoutes}</Switch>
      </AppWrapper>
    </div>
  );
};

export default App;
