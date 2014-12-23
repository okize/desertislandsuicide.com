React = require 'react'

BandName = React.createClass
  displayName: 'BandName'

  render: ->
    <li className="band-item">
      <VoteCount votes={@props.votes.length} />
      {@props.data.name}
      <VoteButton bandId={@props.data._id} />
    </li>

module.exports = BandName
