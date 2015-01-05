React = require 'react'
EventEmitterMixin = require '../mixins/EventEmitterMixin'

VoteButton = React.createClass
  displayName: 'VoteButton'

  mixins: [EventEmitterMixin]

  voteForBand: (e) ->
    e.preventDefault()

    # pass bandId along with event
    @emit 'Voting', 'vote-for-band', @props.bandId

  render: ->
    if @props.loggedIn
      unless @props.userHasVotedFor
        <div className="band-vote-for float-right">
          <button onClick={@voteForBand}>Vote!</button>
        </div>
      else
        <div />
    else
      <div className="sign-in-to-vote float-right">
        Sign in to vote!
      </div>

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
      <VoteButton bandId={@props.data._id} userHasVotedFor={@props.data.userHasVotedFor} loggedIn={@props.loggedIn} />
    </li>

module.exports = BandItem
