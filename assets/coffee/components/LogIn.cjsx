React = require 'react'

LogIn = React.createClass
  displayName: 'LogIn'
  render: ->
    <nav className="login-nav">
      <ul>
        <li>
          <a href="/auth/facebook">Sign in with Facebook</a>
        </li>
        <li>
          <a href="/auth/twitter">Sign in with Twitter</a>
        </li>
        <li>
          <a href="/auth/google">Sign in with Google</a>
        </li>
      </ul>
    </nav>

module.exports = LogIn
