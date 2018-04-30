import React from 'react';
import PropTypes from 'prop-types'

import Button from "material-ui/Button"
import Card, { CardHeader, CardContent, CardActions } from
        'material-ui/Card';
import { Delete, SquareEditOutline } from "mdi-material-ui"


export class TemplateInstanceAsCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    handleCardDelete() {
        this.props.deletedCallback();
    }

    render() {
        return (
            <Card body>
                <CardHeader title={this.props.reportTemplate.name} />

                <CardContent>{this.props.reportTemplate.text}</CardContent>

                <CardActions>
                    <Button variant="raised" onClick={() => {
                        this.props.startLiveRenderingCallback()}}>
                        <SquareEditOutline/>
                    </Button>
                    <Button variant="raised" onClick={() => {
                        this.handleCardDelete()}}>
                        <Delete/>
                    </Button>
                </CardActions>
            </Card>
        );
    }

}

TemplateInstanceAsCard.propTypes = {
    reportTemplate: PropTypes.object,
    deletedCallback: PropTypes.func,
    startLiveRenderingCallback: PropTypes.func,
};
