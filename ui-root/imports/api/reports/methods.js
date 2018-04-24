
import { EJSON } from "meteor/ejson"
import { SimpleSchema } from "meteor/aldeed:simple-schema"
import { ValidatedMethod } from "meteor/mdg:validated-method"

import { ReportTemplates } from "./models";

export const UpsertTemplate = new ValidatedMethod({
    name: "reports.ReportTemplates.Upsert",
    validate: new SimpleSchema({
        templateName: {type: String},
        templateText: {type: String},
    }).validator(),
    run({templateName, templateText}) {
        let upsertedResult = ReportTemplates.upsert({name: templateName},
            {name: templateName, text: templateText});

        if(upsertedResult.insertedId !== undefined) {
            console.log("updated new template named '" + templateName + "' with _id="
                + upsertedResult.insertedId);
        } else {
            console.log("updated template named '" + templateName + "'");
        }

        return upsertedResult;
    }
});

export const DeleteTemplate = new ValidatedMethod({
    name: "reports.ReportTemplates.Delete",
    validate: new SimpleSchema({
        templateId: {type: String},
    }).validator(),
    run({templateId}) {
        console.log("deleting template id=" + templateId);
        let numberDeleted = ReportTemplates.remove({_id: templateId});
        return numberDeleted;
    }
});

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
    }).validator(),

    run({templateId, templateVars}) {
        console.log("Rendering template id=" + templateId + " with vars " + EJSON.stringify(templateVars));
        return "EXAMPLE RENDERED RESULT";
    },
});
