
import React from 'react';

import { Meteor } from "meteor/meteor"
import { ListedTemplateInstance } from "../../components/reports/ListedTemplateInstance"
import { TemplateInstanceCreate } from "../../components/reports/TemplateInstanceCreate";
import { Row } from "reactstrap"

import { ReportTemplates, ReportTemplateCollectionName } from "../../../api/reports/models";
import { DeleteTemplate } from "../../../api/reports/methods";

export default class TemplateManager extends React.Component {

    constructor() {
        super();
        this.state = {
            showNewTemplateForm: false,
            subscription: {
                ReportTemplates: Meteor.subscribe(ReportTemplateCollectionName),
            },
        };
    }

    componentWillUnmount() {
        this.state.subscription.ReportTemplates.stop();
    }

    allReportTemplates() {
        return ReportTemplates.find({}).fetch();
    }

    toggleDisplayTemplateInstanceCreate() {
        this.setState({showNewTemplateForm: !this.state.showNewTemplateForm})
    }

    templateWasDeleted(templateId) {
        console.log("deleting ", templateId);
        let numberDeleted = DeleteTemplate.call({templateId: templateId});
        console.log(numberDeleted + " templates deleted with id=" + templateId);
        this.setState({deletedReportTemplateId: templateId})
    }

    renderMultipleTemplatesPresent() {
        return (
                <div className="container">
                    {this.allReportTemplates().map((reportTemplate) => {
                        return (
                            <Row>
                            <ListedTemplateInstance key={reportTemplate._id}
                                                    reportTemplate={reportTemplate}
                                                    deletedCallback={(id) => {this.templateWasDeleted(id)}}/>
                            </Row>
                        )
                    })}
                </div>
        );
    }

    renderNoReportTemplatesPresent() {
        return (
          <h2 className="list-group-item-info">no report templates created</h2>
        );
    }

    renderTemplateInstances() {
        if(ReportTemplates.find({}).count() === 0) {
            return this.renderNoReportTemplatesPresent();
        } else {
            return this.renderMultipleTemplatesPresent();
        }
    }

    renderTemplateInstanceCreate() {
        return (
        <TemplateInstanceCreate onComplete={() => {this.toggleDisplayTemplateInstanceCreate()}}/>
        )
    }

    renderManagerTopBar() {
        return (
        <div className="container">
            <h1>Template Management</h1>
            <button className={this.state.showNewTemplateForm ? "btn-warning" : "btn-success"}
                onClick={() => {this.toggleDisplayTemplateInstanceCreate()}}>{
                this.state.showNewTemplateForm ? "Cancel" : "New"
            }</button>
        </div>
        );
    }

    render() {

        return (
            <div className="container">
                { this.renderManagerTopBar() }
                { this.state.showNewTemplateForm ? this.renderTemplateInstanceCreate() : null }
                { this.renderTemplateInstances() }
            </div>
        );

    }

}
