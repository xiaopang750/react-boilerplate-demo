import React, { Component } from 'react';
import {Router, Route, Redirect} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import IndexContainer from './containers/index';

const history = createBrowserHistory();

class Routes extends Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <Redirect exact from="/" to="/d3" />
          <Route exact path="/:dashbord" component={IndexContainer} />
        </div>
      </Router>
    );
  }
}

export default Routes;
