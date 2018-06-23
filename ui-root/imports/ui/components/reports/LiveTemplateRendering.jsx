import React from 'react';
import PropTypes from 'prop-types'

import { Random } from "meteor/random"

import { Container, Input, Label, Row, Col } from "reactstrap"
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Button from 'material-ui/styles'
import { Close, } from "mdi-material-ui"

import { KeyValueDisplay } from "./KeyValueDisplay";
import { LiveTemplate } from "./LiveTemplate";
import { StartRenderingSession, StopRenderingSession, RenderTemplate } from
        "../../../api/reports/methods";
import {DefaultLogger} from "../../../../client/logging";

export class LiveTemplateRendering extends React.Component {

    constructor(props) {
        super(props);

        DefaultLogger.debug({obj: {
            templateId: this.props.templateToRender._id,
        }}, "starting live rendering");

        let renderingSessionId = StartRenderingSession.call(
            {templateId: this.props.templateToRender._id,
            sessionId: Random.id()});

        this.state = {
            templateVars: {asdf: 1, qwert: 2},
            templateVarBeingCreatedName: null,
            templateVarBeingCreatedValue: null,
            templateText: this.props.templateToRender.text,
            renderedTemplate: "",
            renderingSessionId: renderingSessionId,
        };
    }

    componentDidMount() {
        this.callRenderTemplate()
    }

    componentWillUnmount() {
        StopRenderingSession.call({sessionId: this.state.renderingSessionId});
    }

    callRenderTemplate() {
        RenderTemplate.call({
            requestId: Random.id(),
            templateId: this.props.templateToRender._id,
            templateVars: this.state.templateVars,
            renderingSessionId: this.state.renderingSessionId,
        });
    }

    changeVariableValue(key, value) {
        let newState = {...this.state};
        newState.templateVars[key] = value;

        this.callRenderTemplate();

        this.setState(newState);
    }

    deleteVariable(key) {
        let newState = {...this.state};
        delete newState.templateVars[key];

        this.callRenderTemplate();

        this.setState(newState);
    }

    render() {
        return (
            <MuiThemeProvider><Container>

            <Row><Col>
            <KeyValueDisplay
                label="Rendering Variables"
                keyValuePairs={this.state.templateVars}
                keyCreatedCallback={(key, value) => {
                    DefaultLogger.debug({obj: {
                        key: key,
                        value: value
                    }}, "rendering variable created");
                    this.changeVariableValue(key, value);
                }}
                keyChangedCallback={(key, value) => {
                    DefaultLogger.debug({obj: {
                        key: key,
                        value: value
                    }}, "rendering variable changed");
                    this.changeVariableValue(key, value);
                }}
                keyDeletedCallback={(key) => {
                    DefaultLogger.debug({obj: {
                        key: key
                    }}, "deleting rendering variable");
                    this.deleteVariable(key);
                }}
            />
            </Col></Row>

            <Row><Col>
                <LiveTemplate
                    renderingSessionId={this.state.renderingSessionId}
                    templateId={this.props.templateToRender._id}
                />
            </Col></Row>

            <Row><Col>
                <Label>Raw Template</Label>
            </Col></Row>
            <Row><Col>
                <Input type="textarea"
                   name="templateContents"
                   disabled
                   value={this.state.templateText}
                   onChange={(e) => {
                       this.setState({templateText: e.target.value})}}
                />
            </Col></Row>

            <Row><Col>
                <Button
                    variant="raised"
                    color="secondary"
                    onClick={() => { this.props.onComplete() }}>

                    Close<Close/>
                </Button>
            </Col></Row>
            </Container></MuiThemeProvider>
        );
    }

}

LiveTemplateRendering.propTypes = {
    templateToRender: PropTypes.object,
    onComplete: PropTypes.func,
};
