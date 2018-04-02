import React, { Component } from 'react';
import Radium, { Style, StyleRoot }  from 'radium';
import Nav from '../containers/Nav';
import Panel from '../containers/Panel';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  getStyles() {
    const bgcolor = "red"
    return {
      landingFooter: {
        position: "absolute",
        bottom: "0",
        left: "0",
        right: "0",
        width: "100%"
      },
      contWindow: {
        position: "absolute",
        top: "50px",
        left: "50px"
      }
    };
  }

  render() {
    const styles = this.getStyles();
    return (
      <StyleRoot>
        <Style rules={{
          body: {
            backgroundColor: "#e4e5e6",
            color: "black",
            fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif'
          }
        }} />
        <Nav />
        <Panel />

        <div style={[styles.contWindow]}>
          {this.props.children}
        </div>
      </StyleRoot>
    );
  }
}

export default Radium(Layout);
