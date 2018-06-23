
import { Meteor } from 'meteor/meteor';

import React from 'react';
import { render } from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import { applyStartupSettings } from "./settingsManagement";

import { renderRoutes } from '../imports/ui/Routes';

import { DefaultLogger } from "./logging";

Meteor.startup(() => {
  applyStartupSettings();

  DefaultLogger.info("client starting up");

  render(renderRoutes(), document.getElementById('root'));
});
