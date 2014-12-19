React = require 'react'

BandName = React.createClass
  displayName: 'BandName'

  voteForBand: (e) ->
    e.preventDefault()
    console.log 'vote for band'

  render: ->
    <li className="band-item">
      {@props.data.name}
      <div className="band-vote-count float-right">
        {@props.votes}
      </div>
      <button className="band-vote-for float-right" onClick={@voteForBand}>Vote!</button>
    </li>

BandList = React.createClass
  displayName: 'BandList'
  render: ->
    <ul className="band-list">
      {@props.data.map((band) ->
        <BandName key={band._id} data={band} votes=0 />
      )}
    </ul>

module.exports = BandList
