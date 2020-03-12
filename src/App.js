import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ErrorBoundary from 'react-error-boundary';
import Home from './pages/Home';
import List from './pages/List';
import View from './pages/View';
import SignIn from './pages/SignIn';
import NotFound from './pages/NotFound';
import UserContext from './contexts/UserContext';

const ErrorFallbackComponent = ({ error }) => <div>{error.message}</div>;

function App() {
  const [user, setUser] = useState({
    username: null,
    email: null,
  });

  const userState = {
    user,
    addUser: info => {
      setUser(info);
    },
    removeUser: () => {
      setUser({
        username: null,
        email: null,
      });
    },
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallbackComponent}>
      <UserContext.Provider value={userState}>
        <BrowserRouter>
          <Switch>
            <Route path="/list" component={List}></Route>
            <Route path="/view" component={View}></Route>
            <Route path="/signin" component={SignIn}></Route>
            <Route exact path="/" component={Home}></Route>
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </UserContext.Provider>
    </ErrorBoundary>
  );
}

export default App;
