React = require 'react'
BandItem = require './BandItem'

BandList = React.createClass
  displayName: 'BandList'

  render: ->
    <ul className="band-list">
      {@props.data.map((band) =>
        <BandItem key={band._id} data={band} votes={band.vote_count} loggedIn={@props.loggedIn} />
      )}
    </ul>

module.exports = BandList
