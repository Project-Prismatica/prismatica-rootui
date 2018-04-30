
import { SimpleSchema } from "meteor/aldeed:simple-schema"
import { ValidatedMethod } from "meteor/mdg:validated-method"

import { getDefaultRenderClient, requestRendering } from "../ReportRenderClient"

export const renderTemplateIntoSession = function(renderSessionId, requestId,
                                                  templateId, templateVars) {
    let renderClient = getDefaultRenderClient();
    requestRendering(renderClient, renderSessionId, requestId, templateId,
        templateVars);
};
