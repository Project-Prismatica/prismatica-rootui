
import React from "react"
import PropTypes from "prop-types"

import { TemplateInstanceAsCard } from "./TemplateInstanceAsCard";

export class TemplatesDisplayAsCards extends React.Component {

    constructor(props) {
        super(props);
    }

    renderSingleTemplate(templateId, template){
        return (
        <TemplateInstanceAsCard
            key={templateId}
            reportTemplate={template}
            deletedCallback={() => this.props.deletedCardCallback(template)}
            startLiveRenderingCallback={
                () => {this.props.startLiveRenderingCallback(template)}}
        />
        );
    };

    render() {
        return (
        <div>
            {Object.keys(this.props.templatesToList).map((templateId) => {
                return this.renderSingleTemplate(templateId,
                    this.props.templatesToList[templateId]);
            })}
        </div>
        );
    }

}

TemplatesDisplayAsCards.propTypes = {
    templatesToList: PropTypes.object,
    deletedCardCallback: PropTypes.func,
    startLiveRenderingCallback: PropTypes.func,
};
