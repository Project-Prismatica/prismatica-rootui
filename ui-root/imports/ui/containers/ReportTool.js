import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import ReactMarkdown from 'react-markdown';
import Radium, { Style, StyleRoot }  from 'radium';

// UI Templating
import { Button } from 'reactstrap';

// API Imports
import { Findings } from '../../api/findings.js';
import { Engagements } from '../../api/engagements.js';
//import { Nessus } from '../api/nessus_ingest.js';

// Components
import Task from '../components/Task.js';
import Observation from '../components/Observation.js';
import CreateObservation from '../components/CreateObservation.js';
import CreateFinding from '../components/CreateFinding.js';

// App component - represents the whole app
class ReportTool extends Component {
   constructor(props) {
    super(props);

    this.state = {
       hideCreateObservation: false,
       hideCreateFinding: false,
    };
   }
   getStyles() {
     const bgcolor = "red"
     return {
       reportRender: {
         marginLeft: "20%",
         padding: "50px 50px 50px 50px",
         width: "800px",
         bottom: "0",
         left: "0",
         right: "0",
         background: "white"
      },
      btnPadding: {
        margin: "10px 0px 0px 10px",
        float: "left"
      }
     };
   }



  getFindings() {
   let findings = this.props.findings;

   return findings.map((finding) => (
      <span key={finding._id}>
         <h3>{finding.title}</h3>
         <br />
         <h5>observation</h5>
         <ReactMarkdown source={finding.observation} />
         <br />
         <h5>discussion</h5>
         <ReactMarkdown source={finding.discussion} />
         <br />
         <h5>recommendations</h5>
         <ReactMarkdown source={finding.recommendations} />
         <br />
         <h5>references</h5>
         <ReactMarkdown source={finding.references} />
         <hr />
      </span>
   ));
  }
  getEngagement() {
     let assessments = this.props.engage;

     return assessments.map((en) => (
        <h1 key={en.title}>
         {en.title}
        </h1>
     ));
  }


  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
    //Nessus.ingest();
  }
  toggleCreateObservation() {
     this.setState({
      hideCreateObservation: !this.state.hideCreateObservation,
      hideCreateFinding: false
     });
  }
  toggleCreateFinding() {
     this.setState({
      hideCreateObservation: false,
      hideCreateFinding: !this.state.hideCreateFinding
     });
  }

  renderCreateObservation() {
     if (this.state.hideCreateObservation) {
       return (
          <CreateObservation />
       )
     } else {
       return (
          <span></span>
       );
     }
  }
  renderCreateFinding() {
     if (this.state.hideCreateFinding) {
       return (
          <CreateFinding />
       )
     } else {
       return (
          <span></span>
       );
     }
  }

  render() {
    const styles = this.getStyles();
    return (
      <StyleRoot>
      <div className="container">
        <div className="dashBox">
          {this.getEngagement()}
          <br />
          <div style={[styles.btnPadding]}>
             <Button color="primary" onClick={this.toggleCreateObservation.bind(this)}>
             New Observation
             </Button>
          </div>
          <div style={[styles.btnPadding]}>
             <Button color="success" onClick={this.toggleCreateFinding.bind(this)}>
             New Finding
             </Button>
          </div>

          <br />
          <br />
          <hr />

          {this.renderCreateObservation()}
          {this.renderCreateFinding()}
        </div>

        <br />
        <br />

        <div style={[styles.reportRender]}>
           <h1>Report Preview</h1>
           <hr />
           <br />
           <ReactMarkdown source="# Findings" />
             {this.getFindings()}

            <ReactMarkdown source="# Methodology" />
        </div>
      </div>
      </StyleRoot>
    );
  }
}

export default withTracker(() => {
  return {
    engage: Engagements.find({}, { sort: { createdAt: -1 } }).fetch(),
    findings: Findings.find({}, { sort: { createdAt: -1 } }).fetch(),
    incompleteCount: Findings.find({ checked: { $ne: true } }).count(),
  };
})(ReportTool);
