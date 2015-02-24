React = require 'react'
VoteButton = require './VoteButton'

BandItem = React.createClass
  displayName: 'BandItem'

  render: ->
    <li className="band-item">
      <div className="band-vote-count">
        {@props.votes}
      </div>
      <div className="band-name">
        {@props.data.name}
      </div>
      <VoteButton bandId={@props.data._id} bandName={@props.data.name} userHasVotedFor={@props.data.userHasVotedFor} loggedIn={@props.loggedIn} />
    </li>

module.exports = BandItem
