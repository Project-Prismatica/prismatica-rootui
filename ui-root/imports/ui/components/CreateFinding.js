import React, { Component } from 'react';
import Radium, { Style, StyleRoot }  from 'radium';

// UI Templating
import { Button } from 'reactstrap';

// Task component - represents a single todo item
export default class CreateFinding extends Component {
  render() {
    return (
      <StyleRoot>
         <br />
         <Button color="danger" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="dropdown-toggle active btn btn-primary bs-tether-target open bs-tether-abutted bs-tether-abutted-left bs-tether-element-attached-top bs-tether-element-attached-left bs-tether-target-attached-bottom bs-tether-target-attached-left">Finding List</Button>

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
