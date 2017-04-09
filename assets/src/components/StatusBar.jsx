import React from 'react';
import LogInLink from './LogInLink.jsx';

const LoggedIn = React.createClass({
  displayName: 'LoggedIn',
  render() {
    return (
      <div className="logged-in">
        {
          '\
    Signed in as '
        }
        {this.props.userName}
        <span className="separator">
          |
        </span>
        <a href="/logout">
          Sign out
        </a>
      </div>
    );
  },
});

const LoggedOut = React.createClass({
  displayName: 'LoggedOut',
  render() {
    return (
      <div className="logged-out">
        <LogInLink />
      </div>
    );
  },
});

const StatusBar = React.createClass({
  displayName: 'StatusBar',
  render() {
    return (
      <div>
        {this.props.loggedIn
          ? <LoggedIn userName={this.props.userName} />
          : <LoggedOut />}
      </div>
    );
  },
});

export default StatusBar;
