import React from 'react';
import LogInLink from './LogInLink.jsx';

class LoggedIn extends React.Component {
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
  }
}

class LoggedOut extends React.Component {
  render() {
    return (
      <div className="logged-out">
        <LogInLink />
      </div>
    );
  }
}

class StatusBar extends React.Component {
  render() {
    return (
      <div>
        {this.props.loggedIn
          ? <LoggedIn userName={this.props.userName} />
          : <LoggedOut />}
      </div>
    );
  }
}

export default StatusBar;
