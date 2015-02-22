React = require 'react'
LogInLink = require './LogInLink'
EventEmitterMixin = require '../mixins/EventEmitterMixin'

VoteButton = React.createClass
  displayName: 'VoteButton'

  mixins: [EventEmitterMixin]

  voteForBand: (e) ->
    e.preventDefault()

    # pass bandId along with event
    @emit 'Voting', 'vote-for-band', @props.bandId

  showLoginButtons: (e) ->
    e.preventDefault()

    # display login buttons when unauthenticated user votes
    @emit 'LogInLink', 'show-modal'

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
        <button onClick={@showLoginButtons}>Vote!</button>
      </div>

module.exports = VoteButton
