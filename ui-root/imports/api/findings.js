import { Mongo } from 'meteor/mongo';

export const Findings = new Mongo.Collection('findings');

export const FindingsList = new Mongo.Collection('findingslist');
