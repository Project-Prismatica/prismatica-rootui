import React, { Component } from 'react';
import Radium, { Style, StyleRoot }  from 'radium';
import { Link } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Dns, CheckCircle, Delete, DeleteForever, AccountCircle, DonutLarge, GetApp, Lable, Home, Reorder, TrendingUp, VerifiedUser, ViewList, Settings, Polymer, Warning, Error, Widgets, FolderShared, Tv, CheckBox, CheckBoxOutlineBlank, Coffee, Poll, Download, Share} from 'mdi-material-ui';

class Panel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getStyles() {
    const bgcolor = {
      default: "#202020"
    }
    return {
      sideBar: {
        position: "absolute",
        zIndex: "2000",
        backgroundColor: "#1e2130",
        color: "#fff",
        width: "50px",
        minHeight: "100%",
        top: "0px",
        right: "0px",
        left: "0px",
        paddingTop: "0px"
      },
      sidebarWidget: {
        position: "relative",
        zIndex: "2012",
        color: "#475070",
        fontFamily: "Helvetica, Arial, sans-serif",
        fontSize: "14px",
        lineHeight: "20px",
        width: "100%",
        minHeight: "50px",
        marginTop: "15px"
      },
      sideIcons: {
        paddingTop: "10px",
        paddingLeft: "10px",
        fontSize: "42px",
        lineHeight: "20px",
        TextDecoration: "none"
      }
    };
  }

  render() {
    const styles = this.getStyles();
    return (
      <MuiThemeProvider>
      <div style={[styles.sideBar]}>
        <div style={[styles.sidebarWidget]}>
         <Link to="/">
          <span style={[styles.sideIcons]}>
            <Polymer color="#475070" hoverColor="yellow" style={{
              fontSize: "70px",
              height: "32px",
              width: "32px",
              lineHeight: "20px",
            }} />
          </span>
         </Link>
        </div>
        <div style={[styles.sidebarWidget]}>
         <Link to="/ReportTool">
          <span style={[styles.sideIcons]}>
          <Poll color="#475070" hoverColor="yellow" style={{
            fontSize: "70px",
            height: "32px",
            width: "32px",
            lineHeight: "20px",
          }} />
          </span>
         </Link>
        </div>
        <div style={[styles.sidebarWidget]}>
          <span style={[styles.sideIcons]}>
          <Dns color="#475070" hoverColor="yellow" style={{
            fontSize: "70px",
            height: "32px",
            width: "32px",
            lineHeight: "20px",
          }} />
          </span>
        </div>
        <div style={[styles.sidebarWidget]}>
          <span style={[styles.sideIcons]}>
          <Widgets color="#475070" hoverColor="yellow" style={{
            fontSize: "70px",
            height: "32px",
            width: "32px",
            lineHeight: "20px",
          }} />
          </span>
        </div>
        <div style={[styles.sidebarWidget]}>
          <span style={[styles.sideIcons]}>
          <Settings color="#475070" hoverColor="yellow" style={{
            fontSize: "70px",
            height: "32px",
            width: "32px",
            lineHeight: "20px",
          }} />
          </span>
        </div>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default Radium(Panel);
