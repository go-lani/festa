import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ErrorBoundary from 'react-error-boundary';
import Home from './pages/Home';
import List from './pages/List';
import View from './pages/View';
import SignIn from './pages/SignIn';
import NotFound from './pages/NotFound';

const ErrorFallbackComponent = ({ error }) => <div>{error.message}</div>;

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallbackComponent}>
      <BrowserRouter>
        <Switch>
          <Route path="/list" component={List}></Route>
          <Route path="/view" component={View}></Route>
          <Route path="/signin" component={SignIn}></Route>
          <Route exact path="/" component={Home}></Route>
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
