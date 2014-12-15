React = require 'react'
LogIn = require './LogIn'

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
      <a href="#">Sign in to vote!</a>
    </div>

StatusBar = React.createClass
  displayName: 'StatusBar'
  render: ->
    <div>
      {if @props.loggedIn then <LoggedIn userName={@props.userName} /> else <LoggedOut />}
      {unless @props.loggedIn then <LogIn /> else null}
    </div>

module.exports = StatusBar
