React = require 'react'
VoteCount = require './VoteCount'
VoteButton = require './VoteButton'

BandItem = React.createClass
  displayName: 'BandItem'

  render: ->
    <li className="band-item">
      <VoteCount votes={@props.votes} />
      <div className="band-name">
        {@props.data.name}
      </div>
      <VoteButton bandId={@props.data._id} />
    </li>

module.exports = BandItem
