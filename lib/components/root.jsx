import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import Admin from './admin';

const Root = () => {
  return (
    <Router history={ hashHistory } >
      <Route path='/' component={ Admin } >
        <IndexRoute component={ Admin } />
      </Route>
    </Router>
  );
};

export default Root;
