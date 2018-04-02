import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import { renderRoutes } from '../imports/ui/Routes.js';

Meteor.startup(() => {
  render(renderRoutes(), document.getElementById('root'));
});
