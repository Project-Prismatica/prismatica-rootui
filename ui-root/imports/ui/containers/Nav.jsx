import React, { Component } from 'react';
import Radium, { Style, StyleRoot }  from 'radium';


import { MuiThemeProvider, } from 'material-ui/styles';
import { AccountCircle, Download, Share, } from 'mdi-material-ui';


class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  getStyles() {
    const bgcolor = {
      default: "#202020"
    }
    return {
      topNav: {
        position: "absolute",
        zIndex: "2000",
        backgroundColor: "#363b4e",
        color: "#99a2ac",
        height: "50px",
        width: "100%",
        top: "0px",
        right: "0px",
        left: "50px",
        borderBottom: "2px solid ##272c3c"
      },
        navText: {
          position: "relative",
          top: "15px"
        },
        navIcons: {
          position: "relative",
          top: "5px"
        },
      searchCont: {
        position: "relative",
        zIndex: "2012",
        float: "left",
        marginLeft: "20px",
        marginRight: "30px",
        width: "260px",
        minHeight: "50px"
      },
        searchText: {
          position: "relative",
          top: "0px"
        },
      topBtn: {
        position: "relative",
        zIndex: "2012",
        float: "left",
        top: "5px",
        marginRight: "30px",
        width: "35px"
      },
      pnameCont: {
        position: "relative",
        zIndex: "2012",
        float: "right",
        overflow: "hidden",
        marginRight: "10px",
        width: "100px",
        minHeight: "50px",
        maxHeight: "50px"
      },
      settingsCont: {
        position: "relative",
        zIndex: "2012",
        float: "right",
        top: "5px",
        marginRight: "30px",
        width: "90px"
      }
    };
  }

  render() {
    const styles = this.getStyles();
    return (
      <MuiThemeProvider>
        <div style={[styles.topNav]}>
          <div style={[styles.searchCont]}>
            <span style={[styles.searchText]}>

            </span>
          </div>
          <div style={[styles.topBtn]}>
            <span style={[styles.navIcons]}>
            <Download color="#475070" hoverColor="yellow" style={{
              fontSize: "70px",
              height: "40px",
              width: "40px",
              lineHeight: "20px",
            }} />
            </span>
          </div>
          <div style={[styles.topBtn]}>
            <span style={[styles.navIcons]}>
            <Share color="#475070" hoverColor="yellow" style={{
              fontSize: "70px",
              height: "40px",
              width: "40px",
              lineHeight: "20px",
            }} />
            </span>
          </div>
          <div className="close" style={[styles.settingsCont]}>
            <AccountCircle color="#475070" hoverColor="yellow" style={{
              fontSize: "70px",
              height: "40px",
              width: "40px",
              lineHeight: "20px",
            }} />
          </div>
          <div style={[styles.pnameCont]}>
            <div style={[styles.navText]}>
              USERNAME
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Radium(Nav);
