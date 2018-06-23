import React from 'react';
import { Random } from "meteor/random"
import { Button, Form, FormGroup, Label, Input } from "reactstrap"

import { UpsertTemplate } from "../../../api/reports/methods";

export class TemplateInstanceCreate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            templateName: "",
            templateText: "",
        };
    }

    handleSubmit() {
        UpsertTemplate.call({
            templateId: Random.id(),
            templateName: this.state.templateName,
            templateText: this.state.templateText
        });
        this.props.onComplete()
    }

    render() {
        return (
            <Form onSubmit={(e) => {e.preventDefault(); this.handleSubmit()}}>
                <FormGroup row>
                    <Label>Name:</Label>
                    <Input type="text" name="templateName" placeholder="template name"
                        value={this.state.templateName}
                        onChange={(e) => {this.setState({templateName: e.target.value})}}/>
                </FormGroup>
                <FormGroup row>
                    <Label>Text:</Label>
                    <Input type="textarea" name="templateContents" placeholder="Text of the template..."
                       value={this.state.templateText}
                       onChange={(e) => {this.setState({templateText: e.target.value})}}/>
                </FormGroup>
                <Button type='submit'>Submit</Button>
            </Form>
        );
    }

}
