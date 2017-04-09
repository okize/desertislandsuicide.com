import React from 'react';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick';
import Notification from './components/Notification.jsx';
import StatusBar from './components/StatusBar.jsx';
import Header from './components/Header.jsx';
import Voting from './components/Voting.jsx';
import EventEmitterMixin from './mixins/EventEmitterMixin.jsx';

// mount point for app
const appEl = document.getElementById('app');

// needed for React Developer Tools
window.React = React;

// init FastClick
FastClick(appEl);

const App = React.createClass({
  displayName: 'App',
  mixins: [EventEmitterMixin],
  getDefaultProps() {
    return {
      loggedIn: window.loggedIn,
      userName: window.userName || null,
    };
  },
  getInitialState() {
    return { notifications: [] };
  },
  displayNotification(obj) {
    return this.setState({ notifications: [obj] });
  },
  componentDidMount() {
    // listener for notifications
    return this.addListener('App', 'notification', this.displayNotification);
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
        <StatusBar
          loggedIn={this.props.loggedIn}
          userName={this.props.userName}
        />
        <Header />
        <Voting loggedIn={this.props.loggedIn} />
      </div>
    );
  },
});

if (appEl != null) {
  ReactDOM.render(<App />, appEl);
}
