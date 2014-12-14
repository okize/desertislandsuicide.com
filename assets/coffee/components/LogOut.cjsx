React = require 'react'

LogOut = React.createClass(
  displayName: 'LogOut'
  render: ->
    <nav className="login-nav">
      <ul>
        <li>
          <a href="/logout">Logout</a>
        </li>
      </ul>
    </nav>
)

module.exports = LogOut
