React   = require 'react'
Voting = require './components/Voting.cjsx'
StatusBar = require './components/StatusBar.cjsx'

props =
  loggedIn: window.loggedIn
  userName: window.userName || null
  refreshRate: 500000

React.render(
  React.createElement(Voting, props),
  document.getElementById 'voting'
)

React.render(
  React.createElement(StatusBar, props),
  document.getElementById 'status'
)
