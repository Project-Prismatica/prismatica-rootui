import React, { Component } from 'react';
import Radium from 'radium';
import {StyleRoot} from 'radium';

import Engagement from '../components/Engagement';
import PrismaticInterpreter from '../components/PrismaticInterpreter';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  getStyles() {
    const bgcolor = {
      default: "white"
    }
    return {
      mainContainer: {
        width: "100%",
        height: "100%"
      }
    };
  }

  render() {
    const styles = this.getStyles();
    return (
      <StyleRoot>
        <div style={[styles.mainContainer]} className="mainContainer">
         <Engagement />
         <PrismaticInterpreter />
        </div>
      </StyleRoot>
    );
  }
}

export default Radium(Dashboard);
