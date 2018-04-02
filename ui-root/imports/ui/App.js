import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory  } from 'react-router';
import Layout from './containers/Layout';
//import Layout from './components/Dashboard';

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
