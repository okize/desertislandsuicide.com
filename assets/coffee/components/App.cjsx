React = require 'React'
StatusBar = require './StatusBar.cjsx'
Header = require './Header.cjsx'
Voting = require './Voting.cjsx'

App = React.createClass
  displayName: 'App'

  render: ->
    <div className="main-wrapper" role="main">
      <StatusBar loggedIn={@props.loggedIn} userName={@props.userName} />
      <Header />
      <Voting loggedIn={@props.loggedIn} />
    </div>

module.exports = App
