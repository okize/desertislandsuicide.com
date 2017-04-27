import React from 'react';

class LogOut extends React.Component {
  render() {
    return (
      <div className="logged-in">
        Signed in as {this.props.userName}
        <span className="separator"> | </span>
        <a href="/logout">Sign out </a>
      </div>
    );
  }
}

export default LogOut;
