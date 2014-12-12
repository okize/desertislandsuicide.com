React = require 'react'

BandList = React.createClass(
  displayName: 'BandList'
  render: ->
    bandNodes = @props.data.map((band) ->
      <li>{band.name}</li>
    )
    <ul className="bandList">
      {bandNodes}
    </ul>
)

module.exports = BandList
