import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import ReactMarkdown from 'react-markdown';

// UI Templating
import { Button } from 'reactstrap';

import { Engagements } from '../../api/engagements.js';

// App component - represents the whole app
class Engagement extends Component {
   constructor(props) {
    super(props);

    this.state = {
       hideCompleted: false,
    };
   }

   createEngagement(event) {
     event.preventDefault();

     // Find the text field via the React ref
     const title = ReactDOM.findDOMNode(this.refs.titleInput).value.trim();
     const type = ReactDOM.findDOMNode(this.refs.typeInput).value.trim();

     Engagements.insert({
       title,
       type,
       createdAt: new Date(), // current time
     });

     // Clear form
     // ReactDOM.findDOMNode(this.refs.textInput).value = '';
   }

   getEngagement() {
      let assessments = this.props.engage;

      return assessments.map((en) => (
         <h1 key={en.title}>
          {en.title}
         </h1>
      ));
   }

  render() {
      if (this.props.engagementCount > 0) {
         return (
            <div className="container">
              <div className="dashBox">
               {this.getEngagement()}
              </div>
            </div>
         );
      } else {
         return (
            <div className="container">
               <form className="new-task" onSubmit={this.createEngagement.bind(this)} >
                 <input
                   type="text"
                   ref="titleInput"
                   placeholder="Engagement Title"
                 />
                <input
                  type="text"
                  ref="typeInput"
                  placeholder="Engagement Type"
                />
                <Button color="primary" onClick={this.createEngagement.bind(this)}>
                   Start Engagement
                </Button>

               </form>
            </div>
         );
      }
  }
}

export default withTracker(() => {
  return {
     engage: Engagements.find({}, { sort: { createdAt: -1 } }).fetch(),
     engagementCount: Engagements.find().count(),
  };
})(Engagement);
