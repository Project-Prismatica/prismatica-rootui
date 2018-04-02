import React, { Component } from 'react';
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
   handleSubmit(event) {
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

         <form className="new-task">
           <input
             type="text"
             ref="textInput"
             placeholder="Type to add new observation"
           />
         </form>
      </StyleRoot>

    );
  }
}
