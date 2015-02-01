React = require 'react'
LogInLink = require './LogInLink'

LoggedIn = React.createClass
  displayName: 'LoggedIn'

  render: ->
    <div className="logged-in">
      Signed in as {@props.userName}
      <span className="separator">|</span>
      <a href="/logout">Sign out</a>
    </div>

LoggedOut = React.createClass
  displayName: 'LoggedOut'

  render: ->
    <div className="logged-out">
      <LogInLink />
    </div>

StatusBar = React.createClass
  displayName: 'StatusBar'

  render: ->
    <div>
      {if @props.loggedIn then <LoggedIn userName={@props.userName} /> else <LoggedOut />}
    </div>

module.exports = StatusBar
