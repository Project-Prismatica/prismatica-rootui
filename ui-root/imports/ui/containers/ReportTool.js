import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import ReactMarkdown from 'react-markdown';
import Radium, { Style, StyleRoot }  from 'radium';

// UI Templating
import { Button } from 'reactstrap';

// API Imports
import { Tasks } from '../../api/tasks.js';
import { Observations } from '../../api/observations.js';
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
       hideCompleted: false,
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

   toggleHideCompleted() {
     this.setState({
       hideCompleted: !this.state.hideCompleted,
     });
     //Nessus.ingest();
   }

  renderFindings() {
   let findings = this.props.tasks;

   return findings.map((finding) => (
      <span key={finding._id}>
         {finding.title}
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

  toggleCreateObservation() {
     this.setState({
      hideCreateObservation: !this.state.hideCreateObservation,
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

  toggleCreateFinding() {
     return (
       <CreateFinding />
     );
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
        </div>

        <br />
        <br />

        <div style={[styles.reportRender]}>
           <h1>Report Preview</h1>
           <hr />
           <br />
           <ReactMarkdown source="# Findings" />
           <ul>
             {this.renderFindings()}
           </ul>

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
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
    incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
  };
})(ReportTool);
