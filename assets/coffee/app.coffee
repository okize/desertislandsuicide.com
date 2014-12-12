React   = require 'react'
Voting = require './components/Voting.cjsx'

refreshRate = 500000

React.render(
  React.createElement(Voting, {
    refreshRate: refreshRate
  }),
  document.getElementById 'voting'
)
