import React from 'react';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick';

import eventBus from './components/eventBus.js';
import Notification from './components/Notification.jsx';
import LogIn from './components/LogIn.jsx';
import LogOut from './components/LogOut.jsx';
import Header from './components/Header.jsx';
import Voting from './components/Voting.jsx';

// needed for React Developer Tools
window.React = React;

// mount point for app
const appEl = document.getElementById('app');

// init FastClick
FastClick(appEl);

const App = React.createClass({
  displayName: 'App',
  getDefaultProps() {
    return {
      loggedIn: window.loggedIn,
      userName: window.userName || null,
    };
  },
  getInitialState() {
    return { notifications: [] };
  },
  handleDisplayNotification(notification) {
    return this.setState({ notifications: [notification] });
  },
  componentDidMount() {
    eventBus.addListener('display-notification', this.handleDisplayNotification);
  },
  render() {
    let notifications;
    if (this.state.notifications.length) {
      const note = this.state.notifications.pop();
      notifications = (
        <Notification delay={note.delay} type={note.type}>
          {note.msg}
        </Notification>
      );
    } else {
      notifications = <span />;
    }
    return (
      <div className="main-wrapper" role="main">
        {notifications}
        {this.props.loggedIn ? <LogOut userName={this.props.userName} /> : <LogIn />}
        <Header />
        <Voting loggedIn={this.props.loggedIn} />
      </div>
    );
  },
});

ReactDOM.render(<App />, appEl);
