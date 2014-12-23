React = require 'react'

VoteCount = React.createClass
  displayName: 'VoteCount'

  render: ->
    <div className="band-vote-count">
      {@props.votes}
    </div>

module.exports = VoteCount
