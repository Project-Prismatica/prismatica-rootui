import React from 'react';
import PropTypes from 'prop-types'

import { Button, Card, CardBody, CardHeader, CardFooter } from "reactstrap"

export class ListedTemplateInstance extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    handleCardDelete() {
        this.props.deletedCallback(this.props.reportTemplate._id)
    }

    render() {
        return (
            <Card body>
                <CardHeader tag={'h3'}>{this.props.reportTemplate.name}</CardHeader>
                <CardBody>{this.props.reportTemplate.text}</CardBody>
                <Button className="btn-warning" onClick={() => {this.handleCardDelete()}
                    }>Delete</Button>
                <CardFooter className='text-muted'>id: {this.props.reportTemplate._id}</CardFooter>
            </Card>
        );
    }

}

ListedTemplateInstance.propTypes = {
    reportTemplate: PropTypes.object,
    deletedCallback: PropTypes.function,
};
