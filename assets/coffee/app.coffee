React   = require 'react'
App = require './components/App.cjsx'

config =
  loggedIn: window.loggedIn
  userName: window.userName || null

React.render(
  React.createElement(App, config),
  document.getElementById 'app'
)
