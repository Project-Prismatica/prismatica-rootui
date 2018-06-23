import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import ReactMarkdown from 'react-markdown';

// Terminal
import Terminal from 'terminal-in-react';

// UI Templating
import { Button } from 'reactstrap';

import { Engagements } from '../../api/engagements.js';

// App component - represents the whole app
class PrismaticInterpreter extends Component {
   constructor(props) {
    super(props);

    //showMsg = 'Hello World'

    this.state = {
       hideCompleted: false,
    };
   }


  render() {
      return (
         <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <Terminal
             color='green'
             backgroundColor='black'
             barColor='black'
             style={{ fontWeight: "bold", fontSize: "1em", width: "100%" }}
             commands={{
               'open-google': () => window.open('google.com', '_blank'),
               showmsg: "asdf",//this.showMsg,
               popup: () => alert('Terminal in React')
             }}
             descriptions={{
               'open-google': 'opens google.com',
               showmsg: 'shows a message',
               alert: 'alert', popup: 'alert'
             }}
             msg='You can write anything here. Example - Hello! My name is Foo and I like Bar.'
             watchConsoleLogging
             setPromptPrefix='true'
             allowTabs="false"
            />
         </div>
      );
  }
}

export default withTracker(() => {
  return {
     engage: Engagements.find({}, { sort: { createdAt: -1 } }).fetch(),
     engagementCount: Engagements.find().count(),
  };
})(PrismaticInterpreter);
