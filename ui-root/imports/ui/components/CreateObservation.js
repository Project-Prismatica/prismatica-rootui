import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Radium, { Style, StyleRoot }  from 'radium';

// UI Templating
import { Button } from 'reactstrap';

// API Imports
import { Observations } from '../../api/observations.js';

// Task component - represents a single todo item
export default class CreateObservation extends Component {
   constructor(props) {
      super(props);

      this.state = {
       hideCreateObservationWizard: false,
      };
   }
   newObservation(event) {
     event.preventDefault();

     // Find the text field via the React ref
     const title = ReactDOM.findDOMNode(this.refs.titleInput).value.trim();
     const details = ReactDOM.findDOMNode(this.refs.detailsInput).value.trim();

     Observations.insert({
       title,
       details,
       createdAt: new Date(), // current time
     });

     // Clear form
     ReactDOM.findDOMNode(this.refs.titleInput).value = '';
     ReactDOM.findDOMNode(this.refs.detailsInput).value = '';
     this.setState({
      hideCreateObservationWizard: !this.state.hideCreateObservationWizard,
     });
   }

  render() {
     if (this.state.hideCreateObservationWizard) {
      return (
          <span></span>
      )
     } else {
        return (
          <StyleRoot>
             <br />
             <h3>Create New Observation</h3>
             <form className="new-task" onSubmit={this.newObservation.bind(this)}>
               <input
                 type="text"
                 ref="titleInput"
                 placeholder="Observation Title"
               />
               <input
                 type="text"
                 ref="detailsInput"
                 placeholder="Type to add new observation details"
               />
               <Button color="primary" onClick={this.newObservation.bind(this)}>
                 Submit
               </Button>
             </form>
          </StyleRoot>
        );
     }


  }
}
