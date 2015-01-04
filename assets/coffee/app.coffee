React   = require 'react'
StatusBar = require './components/StatusBar.cjsx'
Header = require './components/Header.cjsx'
Voting = require './components/Voting.cjsx'

App = React.createClass
  displayName: 'App'

  config:
    loggedIn: window.loggedIn
    userName: window.userName || null

  render: ->
    <div className="main-wrapper" role="main">
      <StatusBar loggedIn={@config.loggedIn} userName={@config.userName} />
      <Header />
      <Voting loggedIn={@config.loggedIn} />
    </div>

React.render <App />, document.getElementById 'app'
