import { Mongo } from 'meteor/mongo'

import SimpleSchema from "simpl-schema"

export const Schemas = {};

export const ReportTemplateCollectionName = "reports.ReportTemplates";

export const ReportTemplates = new Mongo.Collection(
    ReportTemplateCollectionName);

export const RenderingSessionCollectionName = "reports.RenderingSessions";
export const RenderingSessions = new Mongo.Collection(
    RenderingSessionCollectionName);
Schemas.RenderingSessions = new SimpleSchema({
    id: {
        type: String,
        required: true,
    },
    templateId: {
        type: String,
        optional: false,
        custom: function () {
            if(ReportTemplates.find({_id: this.value}).count() !== 1) {
                return "unknown template id=" + this.value;
            }
        },
    },
    renderedDocument: {
        type: String,
        optional: true,
    },
    updatedAt: {
        type: Date,
        optional: true,
        autoValue: function() {
            if(this.isInsert || this.isUpdate || this.isUpsert) {
                return new Date();
            }
        }
    },
    createdAt: {
        type: Date,
        optional: true,
        autoValue: function () {
            if(this.isInsert){
                return new Date();
            }
        }
    },
    error: {
        type: String,
        optional: true,
    }
});
RenderingSessions.attachSchema(Schemas.RenderingSessions);
