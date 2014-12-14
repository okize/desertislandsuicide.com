React = require 'react'

BandName = React.createClass(
  displayName: 'BandName'
  render: ->
    <li>{@props.data.name}</li>
)

BandList = React.createClass(
  displayName: 'BandList'
  render: ->
    <ul className="band-list">
      {@props.data.map((band) ->
        <BandName key={band._id} data={band}/>
      )}
    </ul>
)

module.exports = BandList
