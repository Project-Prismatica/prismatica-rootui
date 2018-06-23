import React, { Component } from 'react';
import { Router, Route, hashHistory  } from 'react-router';
import Layout from './containers/Layout';

export default class Root extends Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={Layout}>
          <IndexRoute component={Layout} />
        </Route>
      </Router>
    );
  }
}
