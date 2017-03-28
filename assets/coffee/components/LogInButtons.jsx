import React from "react";

let LogInButtons = React.createClass({
  displayName: "LogInButtons",
  render() {
    return (
      <nav className="login-nav">
        <a href="/auth/facebook" className="login-button login-facebook flag">
          <img src="../images/icon-facebook.svg" className="flag-image" />
          <span className="flag-body">
            {"Sign in with "}
            <strong>
              Facebook
            </strong>
          </span>
        </a>
        <a href="/auth/twitter" className="login-button login-twitter flag">
          <img src="../images/icon-twitter.svg" className="flag-image" />
          <span className="flag-body">
            {"Sign in with "}
            <strong>
              Twitter
            </strong>
          </span>
        </a>
        <a href="/auth/google" className="login-button login-google flag">
          <img src="../images/icon-google.svg" className="flag-image" />
          <span className="flag-body">
            {"Sign in with "}
            <strong>
              Google
            </strong>
          </span>
        </a>
      </nav>
    );
  }
});

export default LogInButtons;
