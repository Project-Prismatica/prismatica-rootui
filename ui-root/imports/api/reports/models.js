import { Mongo } from 'meteor/mongo';

export const ReportTemplateCollectionName = "reports.ReportTemplates";

export const ReportTemplates = new Mongo.Collection(ReportTemplateCollectionName);
export const ReportTemplatePublicFields = [ "name", "contents" ];
