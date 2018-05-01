import { Meteor } from "meteor/meteor"

import SimpleSchema from "simpl-schema"
import { ValidatedMethod, ValidationError } from "meteor/mdg:validated-method"

import {ReportTemplates, RenderingSessions} from "./models";

const importTarget = Meteor.isServer ? "../../../server/logging" :
    "../../../client/logging";
const { DefaultLogger } = require(importTarget);

export const UpsertTemplate = new ValidatedMethod({
    name: "reports.ReportTemplates.Upsert",
    validate: new SimpleSchema({
        templateId:     {type: String, },
        templateName:   {type: String, },
        templateText:   {type: String, },
    }).validator(),
    run({templateName, templateText, templateId}) {
        let upsertedResult = ReportTemplates.upsert({id: templateId},
            {name: templateName, text: templateText});

        DefaultLogger.info({obj: {
            action: upsertedResult["insertedId"] !== undefined ?
                "create" : "update",
            templateId: templateId,
        }}, "template updated");

        return upsertedResult;
    }
});

export const DeleteTemplate = new ValidatedMethod({
    name: "reports.ReportTemplates.Delete",
    validate: new SimpleSchema({
        templateId: {type: String, },
    }).validator(),
    run({templateId}) {
        DefaultLogger.info({
            templateId: templateId,
        }, "deleting template");

        let numberDeleted = ReportTemplates.remove(
            {$or: [ {id: templateId}, {_id: templateId}]},
        );
        return numberDeleted;
    },
});

export const StartRenderingSession = new ValidatedMethod({
    name: "reports.ReportTemplates.StartRenderingSession",
    validate: new SimpleSchema({
        templateId: {
            type: String,
            optional: false,
            custom: function() {
                if (ReportTemplates.find({_id: this.value}).count() !== 1) {
                    return "unknown report template id=" + this.value;
                }
            },
        },
        sessionId: {
            type: String,
            optional: false,
        }
    }).validator(),
    run({templateId, sessionId}) {
        let insertResult = RenderingSessions.insert(
            {id: sessionId, templateId: templateId});

        DefaultLogger.info({obj:{
            sessionId: sessionId,
            templateId: templateId,
            mongodbId: insertResult,
        }}, "created rendering session");

        return sessionId;
    },
});

export const StopRenderingSession = new ValidatedMethod({
    name: "reports.ReportTemplates.StopRenderingSession",
    validate: new SimpleSchema({
        sessionId: {
            type: String,
            optional: false,
            custom: userIsAuthorizedForRenderingSessionValidator,
        }
    }).validator(),
    run({sessionId}) {
        DefaultLogger.info({
            sessionId: sessionId,
        }, "stopping rendering session");
        RenderingSessions.remove(({id: sessionId}))
    }
});

/**
 * The client only sees a stub of this method since we need to import server-only stubs here.
 *
 * Server stubs are under ```server/reports/methods.js```
 */
export const RenderTemplate = new ValidatedMethod({
    name: "reports.ReportTemplates.Render",
    validate: new SimpleSchema({
        templateId: {
            type: String,
            optional: false
        },
        templateVars: {
            type: Object,
            optional: true,
            defaultValue: {},
            blackbox: true,
        },
        requestId: {
            type: String,
            optional: false,
        },
        renderingSessionId: {
            type: String,
            optional: false,
            custom: userIsAuthorizedForRenderingSessionValidator,
        }
    }).validator(),
    run({requestId, renderingSessionId, templateId, templateVars}) {
        DefaultLogger.info({obj:{
            requestId: requestId,
            templateId: templateId,
            renderingSessionId: renderingSessionId,
            templateVars: templateVars,
        }}, "rendering template into session");
        if(Meteor.isServer) {
            const { renderTemplateIntoSession } = require(
                "/server/reports/methods.js");
            renderTemplateIntoSession(renderingSessionId, requestId,
                templateId, templateVars);
        }
    },
});

/**
 * A stub for in the future when we can enforce some AAA
 */
export const IsAuthorizedForRenderingSession = new ValidatedMethod({
    name: "reports.ReportTemplates.IsAuthorizedForRenderingSession",
    validate: new SimpleSchema({
        sessionId: {
            type: String,
            optional: false,
        }
    }).validator(),
    run({sessionId}) {
        let isAuthorized = true;
        if(RenderingSessions.find({id: sessionId}).count() === 0) {
            isAuthorized = false;
        }

        return isAuthorized;
    },
});

function userIsAuthorizedForRenderingSessionValidator() {
    let isAuthorized = IsAuthorizedForRenderingSession.call(
        {sessionId: this.value});
    if(! isAuthorized){
        return "user is not authorized for sessionId=" + this.value;
    }

    // this is how one specifies an acceptable value
    return undefined;
}
