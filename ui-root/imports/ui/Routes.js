import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch, IndexRoute } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

//Route Components
import Layout from './containers/Layout';
import Dashboard from './containers/Dashboard';
import ReportTool from './containers/ReportTool';

const browserHistory = createBrowserHistory();

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Switch>
      <Layout>
         <Route exact path="/" component={Dashboard} />
         <Route path="/ReportTool" component={ReportTool} />
      </Layout>
    </Switch>
  </Router>
);
