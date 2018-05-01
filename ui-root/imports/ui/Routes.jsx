import React, { Component } from 'react';
import { Router, Route, Switch, } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import Layout from './containers/Layout';
import Dashboard from './containers/Dashboard';
import ReportTool from './containers/ReportTool';
import TemplateManager from './containers/reports/TemplateManager'

const browserHistory = createBrowserHistory();

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Switch>
      <Layout>
         <Route exact path="/" component={Dashboard} />
         <Route path="/ReportTool" component={ReportTool} />
         <Route path="/reports/TemplateManager" component={TemplateManager} />
      </Layout>
    </Switch>
  </Router>
);
