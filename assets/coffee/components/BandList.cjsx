React = require 'react'
BandName = require './BandName'

BandList = React.createClass
  displayName: 'BandList'
  render: ->
    <ul className="band-list">
      {@props.data.map((band) ->
        <BandName key={band._id} data={band} votes={band.vote_count} />
      )}
    </ul>

module.exports = BandList
