import React from 'react';
import { NavigationContainer } from './App.style';
import NavBar from '../../core/nav-bar';
import { Route, Switch } from 'react-router-dom';
import routes from '../../../routes/routes';

const App = () => {
  const renderedRoutes = routes.map((route) => (
    <Route
      key={route.id}
      component={route.component}
      exact={route.exact}
      path={route.path}
    />
  ));
  return (
    <div className='App'>
      <NavigationContainer>
        <NavBar />
        <Switch>{renderedRoutes}</Switch>
      </NavigationContainer>
    </div>
  );
};

export default App;
