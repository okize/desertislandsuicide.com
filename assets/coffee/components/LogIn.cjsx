React = require 'react'

LogIn = React.createClass
  displayName: 'LogIn'

  render: ->
    <nav className="login-nav">
      <ul>
        <li className="login-nav-facebook">
          <img src="../images/icon-facebook.svg" />
          <a href="/auth/facebook">Sign in with Facebook</a>
        </li>
        <li className="login-nav-twitter">
          <img src="../images/icon-twitter.svg" />
          <a href="/auth/twitter">Sign in with Twitter</a>
        </li>
        <li className="login-nav-google">
          <img src="../images/icon-google.svg" />
          <a href="/auth/google">Sign in with Google</a>
        </li>
      </ul>
    </nav>

module.exports = LogIn
