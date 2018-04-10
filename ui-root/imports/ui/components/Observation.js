import React, { Component } from 'react';

// Task component - represents a single todo item
export default class Observation extends Component {
  render() {
    return (
      <li>{this.props.observation.text}</li>
    );
  }
}
