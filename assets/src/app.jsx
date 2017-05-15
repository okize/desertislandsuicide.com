import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick';

import eventBus from './components/eventBus';
import Notification from './components/Notification';
import LogIn from './components/LogIn';
import LogOut from './components/LogOut';
import Header from './components/Header';
import Voting from './components/Voting';

// needed for React Developer Tools
window.React = React;

// mount point for app
const appEl = document.getElementById('app');

// init FastClick
FastClick(appEl);

class App extends React.Component {
  static propTypes = {
    loggedIn: PropTypes.bool,
    userName: PropTypes.string,
  };

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
