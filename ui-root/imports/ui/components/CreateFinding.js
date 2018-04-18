import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Radium, { Style, StyleRoot }  from 'radium';
import { withTracker } from 'meteor/react-meteor-data';

// UI Templating
import { Button, Input, Form, FormGroup, Label } from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

// API imports
import { Observations } from '../../api/observations.js';
import { Findings, FindingsList } from '../../api/findings.js';

// Task component - represents a single todo item
class CreateFinding extends Component {
   constructor(props) {
      super(props);

      this.toggleObsList = this.toggleObsList.bind(this);
      this.toggleFndList = this.toggleFndList.bind(this);
      this.state = {
       hideCreateFindingWizard: false,
       findingBuilder: false,
       observationsOpen: false,
       findingsOpen: false,
       fid: "...",
       ttltmp: "...",
       obstmp: "...",
       dsctmp: "...",
       rcmtmp: "...",
       reftmp: "...",
       assignedobs: [{_id: "0", title: ""}]
      };
   }
   getStyles() {
     const bgcolor = "red"
     return {
      overScroll: {
        overflow: "auto",
        maxHeight: "300px"
      }
     };
   }
   newFinding(event) {
     event.preventDefault();

     // Find the text field via the React ref
     const title = ReactDOM.findDOMNode(this.refs.titleInput).value.trim();
     const observation = ReactDOM.findDOMNode(this.refs.observationsInput).value.trim();
     const discussion = ReactDOM.findDOMNode(this.refs.discussionInput).value.trim();
     const recommendations = ReactDOM.findDOMNode(this.refs.recommendationsInput).value.trim();
     const references = ReactDOM.findDOMNode(this.refs.referencesInput).value.trim();

     Findings.insert({
       title,
       observation,
       discussion,
       recommendations,
       references,
       createdAt: new Date(), // current time
     });

     // Clear form
     this.setState({
      hideCreateFindingWizard: !this.state.hideCreateFindingWizard,
     });
   }

   getObservationList() {
     let observations = this.props.observations;

     return observations.map((ob) => (
        <DropdownItem key={ob._id} onClick={this.assignObservation.bind(this, ob.title, ob._id)}>{ob.title}</DropdownItem>
     ));
   }
   getFindingList() {
     let findings = this.props.findingsList;

     return findings.map((fnd) => (
        <DropdownItem key={fnd._id} onClick={this.setFindingTemplate.bind(this, fnd._id, fnd.title, fnd.observation, fnd.discussion, fnd.recommendations, fnd.references)}>{fnd.title}</DropdownItem>
     ));
   }
   getObservationDetails() {
     let observations = this.props.observations;

     return observations.map((ob) => (
        <DropdownItem key={ob._id}>{ob.title}</DropdownItem>
     ));
   }

   setFindingTemplate(fid, ttltmp, obstmp, dsctmp, rcmtmp, reftmp) {
      this.setState({
         findingBuilder: true,
         fid: fid,
         ttltmp: ttltmp,
         obstmp: obstmp,
         dsctmp: dsctmp,
         rcmtmp: rcmtmp,
         reftmp: reftmp
      })
   }

   assignObservation(obs, oid) {
      var updateObservations = this.state.assignedobs.slice();
      updateObservations.push({_id: oid, title: obs})
      this.setState({ assignedobs: updateObservations})
   }

   renderAssignedObservations() {
      let obs = this.state.assignedobs;
      const listItems = obs.map((ob) => (
         <li key={ob._id}>{ob.title}</li>
      ));
      return (
         <ul>{listItems}</ul>
      );
   }
   renderFindingBuilder() {
     if (this.state.findingBuilder) {
        return (
           <span>
           <FormGroup>
           <h3>Finding: {this.state.ttltmp}</h3>
           <Input type="hidden" ref="titleInput" value={this.state.ttltmp} />
           <Label size="lg">Observations</Label>
           <Dropdown isOpen={this.state.observationsOpen} toggle={this.toggleObsList}>
               <DropdownToggle caret>
                  Add Observation
               </DropdownToggle>
               <DropdownMenu>
                  {this.getObservationList()}
               </DropdownMenu>
           </Dropdown>
           <br />
           {this.renderAssignedObservations()}
           <br />
           <Label>Custom Observation Details</Label>
           <Input type="textarea" ref="observationsInput" rows="10" defaultValue={this.state.obstmp} />
           </FormGroup>

           <FormGroup>
           <Label size="lg">Discussion</Label>
           <Input type="textarea" ref="discussionInput" rows="10" defaultValue={this.state.dsctmp} />
           </FormGroup>

           <FormGroup>
           <Label size="lg">Recommendations</Label>
           <Input type="textarea" ref="recommendationsInput" rows="10" defaultValue={this.state.rcmtmp} />
           </FormGroup>

           <FormGroup>
           <Label size="lg">References</Label>
           <Input type="textarea" ref="referencesInput" rows="10" defaultValue={this.state.reftmp} />
           </FormGroup>

           <hr />
           <Button color="primary" onClick={this.newFinding.bind(this)}>
             Submit
           </Button>
           </span>
        )
     } else {
        return (
          <span></span>
        );
     }
   }

   toggleObsList() {
     this.setState({
       observationsOpen: !this.state.observationsOpen
     });
   }
   toggleFndList() {
     this.setState({
       findingsOpen: !this.state.findingsOpen
     });
   }

  render() {
     const styles = this.getStyles();
     if (this.state.hideCreateFindingWizard) {
      return (
          <span></span>
      )
     } else {
        return (
          <StyleRoot>
             <br />
             <h3>Create New Finding</h3>
             <Form onSubmit={this.newFinding.bind(this)}>
               <FormGroup>
                <Dropdown isOpen={this.state.findingsOpen} toggle={this.toggleFndList}>
                  <DropdownToggle caret>
                     Select Finding
                  </DropdownToggle>
                  <DropdownMenu style={[styles.overScroll]}>
                     {this.getFindingList()}
                     <DropdownItem divider />
                     <DropdownItem>Custom Finding</DropdownItem>
                  </DropdownMenu>
               </Dropdown>
              </FormGroup>

              <hr />

              {this.renderFindingBuilder()}

             </Form>
          </StyleRoot>
        );
     }
  }
}

export default withTracker(() => {
  return {
    observations: Observations.find({}, { sort: { createdAt: -1 } }).fetch(),
    findingsList: FindingsList.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
})(CreateFinding);
