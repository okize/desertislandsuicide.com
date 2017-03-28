import React from "react";
import LogInLink from "./LogInLink";

let LoggedIn = React.createClass({
  displayName: "LoggedIn",
  render() {
    return (
      <div className="logged-in">
        {
          `\
    Signed in as `
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
});

let LoggedOut = React.createClass({
  displayName: "LoggedOut",
  render() {
    return (
      <div className="logged-out">
        <LogInLink />
      </div>
    );
  }
});

let StatusBar = React.createClass({
  displayName: "StatusBar",
  render() {
    return (
      <div>
        {this.props.loggedIn
          ? <LoggedIn userName={this.props.userName} />
          : <LoggedOut />}
      </div>
    );
  }
});

export default StatusBar;
