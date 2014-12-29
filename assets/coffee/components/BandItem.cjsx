React = require 'react'
VoteCount = require './VoteCount'
VoteButton = require './VoteButton'

BandItem = React.createClass
  displayName: 'BandItem'

  render: ->
    <li className="band-item" loggedIn={@props.loggedIn} >
      <VoteCount votes={@props.votes} />
      <div className="band-name">
        {@props.data.name}
      </div>
      <VoteButton bandId={@props.data._id} userHasVotedFor={@props.data.userHasVotedFor} loggedIn={@props.loggedIn} />
    </li>

module.exports = BandItem
