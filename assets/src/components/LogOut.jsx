import React, { PropTypes } from 'react';

const LogOut = ({ userName }) => (
  <div className="logged-in">
    Signed in as {userName}
    <span className="separator"> | </span>
    <a href="/logout">Sign out </a>
  </div>
);

LogOut.propTypes = {
  userName: PropTypes.string.isRequired,
};

export default LogOut;
