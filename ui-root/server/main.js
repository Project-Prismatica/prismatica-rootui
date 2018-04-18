import { Meteor } from 'meteor/meteor';

import '../imports/api/tasks.js';
import '../imports/api/engagements.js';
import '../imports/api/observations.js';
import '../imports/api/findings.js';
import '../imports/api/nessus_ingest.js';

import '../imports/api/images.js';
import '../imports/api/image-upload.js';

Meteor.startup(() => {
  // code to run on server at startup
});
