
import React from "react"
import PropTypes from "prop-types"

import Card, { CardHeader, CardContent, } from
        'material-ui/Card';
import { Input, Snackbar, Typography, } from 'material-ui';

import { DefaultLogger } from "../../../../client/logging";
import { RenderingSessions } from "../../../api/reports/models";

export class LiveTemplate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            updatedAt: "never",
            lastError: undefined,
            observationHandle: null,
            renderedDocument: undefined,
            renderingSessionCursor: null,
        };

        this.state.renderingSessionCursor = RenderingSessions.find(
            {id: this.props.renderingSessionId});

        this.observeRenderingSessionChanges(this.state.renderingSessionCursor);
        DefaultLogger.info({
            liveTemplateProperties: this.props,
        }, "starting rendering session")
    }

    componentWillUnmount() {
        this.state.observationHandle.stop();
    }

    observeRenderingSessionChanges(sessionCursor) {
        this.state.observationHandle = sessionCursor.observeChanges({
            changed: (_id, fields) => {
                let updatedState = {...this.state};
                if(fields.renderedDocument) {
                    updatedState.renderedDocument = fields.renderedDocument;
                }
                if(fields.updatedAt) {
                    updatedState.updatedAt =
                        fields.updatedAt.toLocaleString();
                }
                if(fields.error) {
                    updatedState.lastError = fields.error;
                }

                DefaultLogger.debug({obj: {
                    _id: _id,
                    fields: fields,
                    stateAddition: updatedState
                }}, "rendering session changed");

                this.setState(updatedState);
            },
        });
    }

    render() {
        return (
        <div>
        <Card>
        <CardHeader title="Live Rendered Document"/>
        <CardContent>
            <Typography>{this.state.renderedDocument}</Typography>
        </CardContent>
        </Card>
        <Snackbar
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
            open={!!this.state.lastError}
            message={
                <span>{this.state.lastError}</span>
            }
        />
        </div>
        );
    }
}

LiveTemplate.propTypes = {
    renderingSessionId: PropTypes.string,
};
