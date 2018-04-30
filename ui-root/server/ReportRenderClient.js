
import { Meteor } from "meteor/meteor"
import { Random } from "meteor/random"

import grpc from "grpc";
import { Timestamp } from 'google-protobuf/google/protobuf/timestamp_pb'

import { DefaultLogger } from "./logging";
import { RenderingSessions } from "../imports/api/reports/models";

import { PrismaticaReportRendererClient } from "./protos/prismatica_report_renderer_grpc_pb"
import { RenderRequest } from "./protos/prismatica_report_renderer_pb"
import { getSettingValue, settingNameRPCReportRender } from "./settingsManagement"


function getRenderClient({remoteHost, credentials}) {
    DefaultLogger.debug({
        remoteHost: remoteHost,
        credentials: credentials,
    }, "creating render rpc client");

    return new PrismaticaReportRendererClient(
        remoteHost, credentials
    );
}

export function getDefaultRenderClient() {
    const renderHost = getSettingValue(settingNameRPCReportRender);
    const renderCredentials = grpc.credentials.createInsecure();
    DefaultLogger.debug({
        renderHost: renderHost,
        renderCredentials: renderCredentials,
    }, "using default render rpc client parameters");
    return getRenderClient({remoteHost: renderHost,
        credentials: renderCredentials});
}

export function requestRendering(client, renderSessionId, requestId, templateId,
                                 templateVars) {
    let requestTimestamp = new Timestamp();
    requestTimestamp.setSeconds(new Date().getSeconds());

    let requestObject = new RenderRequest();
    requestObject.setTimestamp(requestTimestamp);
    requestObject.setTemplateid(templateId);
    requestObject.setRequestid(requestId);

    Object.keys(templateVars).forEach((key) => {
        const value = templateVars[key];
        requestObject.getRenderingvariablesMap().set(key, value);
    });

    DefaultLogger.info({
        templateId: templateId,
        requestId: requestId,
        sessionId: renderSessionId,
    }, "starting render request");
    client.render(requestObject, Meteor.bindEnvironment((err, response) => {
        if(err) {
            const errorText = err.toString();
            DefaultLogger.error({
                remoteHost: getSettingValue(settingNameRPCReportRender),
                requestId: requestId,
                renderingSessionId: renderSessionId,
                error: errorText,
                templateId: templateId,
            }, "error while rendering");

            RenderingSessions.update({id: renderSessionId},
                {$set: {error: errorText}});
            client.close();
        } else {
            const responseObject = response.toObject();

            DefaultLogger.debug({
                response: responseObject,
                requestId: requestId,
                renderingSessionId: renderSessionId,
            }, "completed rendering request");

            RenderingSessions.update({id: renderSessionId},
                {$set: {renderedDocument: responseObject.result, error: null}});
            client.close();
        }
    }));
}
