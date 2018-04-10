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
       hideCompleted: false,
      };
   }
   newObservation(event) {
     event.preventDefault();

     // Find the text field via the React ref
     const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

     Observations.insert({
       text,
       createdAt: new Date(), // current time
     });

     // Clear form
     ReactDOM.findDOMNode(this.refs.textInput).value = '';
   }

  render() {
    return (
      <StyleRoot>
         <br />

         <form className="new-task" onSubmit={this.newObservation.bind(this)}>
           <input
             type="text"
             ref="textInput"
             placeholder="Type to add new observation"
           />
           <Button color="primary" onClick={this.newObservation.bind(this)}>
             Submit
           </Button>
         </form>
      </StyleRoot>

    );
  }
}
