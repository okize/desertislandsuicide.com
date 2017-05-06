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

class App extends React.Component {
  static defaultProps = {
    loggedIn: window.loggedIn,
    userName: window.userName || null,
  };

  state = { notifications: [] };

  componentDidMount() {
    eventBus.addListener('display-notification', this.handleDisplayNotification);
  }

  handleDisplayNotification = notification => this.setState({ notifications: [notification] });

  renderNotifications() {
    if (this.state.notifications.length) {
      const note = this.state.notifications.pop();
      return (
        <Notification delay={note.delay} type={note.type}>
          {note.msg}
        </Notification>
      );
    }
    return null;
  }

  render() {
    return (
      <div className="main-wrapper" role="main">
        {this.renderNotifications()}
        {this.props.loggedIn ? <LogOut userName={this.props.userName} /> : <LogIn />}
        <Header />
        <Voting loggedIn={this.props.loggedIn} />
      </div>
    );
  }
}

ReactDOM.render(<App />, appEl);
